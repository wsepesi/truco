import React, { useEffect } from 'react'

import Board from './Board';
import { Box } from '@mui/system';
import Chat from './Chat';
import { Game } from '../configs/types';
import GameBar from './GameBar';
import GameOver from './GameOver';
import HandOver from './HandOver';
import PointTracker from './PointTracker';
import { SYSTEM_COLORS } from '../configs/colors';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../hooks/socket-context';
import { Typography } from '@mui/material';

type Props = {
    socket: Socket | null
}

const GameHome = (props: Props) :React.ReactElement => {
    const { socket } = props;

    const [game, setGame] = React.useState<Game>();

    const endOfGame = game ? game.endOfGame : false;
    const endOfHand = game ? game.endOfHand : false;

    const isSpectator = (game && socket) ? (game.hostId !== socket.id && game.otherId !== socket.id) : true;

    const updateAllStates = (game: Game) => {
        setGame(game);
    }

    useEffect(() => {
        if (socket) {
          socket.on("startGame", (game: Game) => {
            // console.log("startGame", game);
            updateAllStates(game);
          })

          socket.on('updateAll', (game: Game) => {
            updateAllStates(game);
          })
    
          return () => {
            socket.off("startGame");
            socket.off("updateAll");
          }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [socket]);

  return (
    <Box sx={{height: "100vh", backgroundColor: SYSTEM_COLORS.BACKGROUND_2}}>
        <GameBar socket={socket} game={game}/>
        <Box sx={{display: 'flex', flex: 'column', width: '100vw', minHeight: '85vh'}}>
            <Box style={{width: "15vw"}}>
                {game && <PointTracker
                    hostPoints={game.hostPoints}
                    otherPoints={game.otherPoints}
                    handTrucoPoints={game.handTrucoPoints}
                    handEnvidoPoints={game.handEnvidoPoints}
                    trick1Cards={game.trick1Cards}
                    trick2Cards={game.trick2Cards}
                    cardsPlayedInHand={game.cardsPlayedInHand}
                />}
            </Box>
            <Box style={{width: "70vw", borderLeft: "2px solid black", borderRight: "2px solid black"}}>
                {(game && !(endOfGame || endOfHand)) && <SocketContext.Consumer>
                    {socket =>
                        <Board
                            socket={socket}
                            game={game}
                            isSpectator={isSpectator}
                        />
                    }
                </SocketContext.Consumer>}
                {(game && endOfHand && !isSpectator) && <HandOver game={game} socket={socket}/>}
                {(game && endOfGame && !isSpectator) && <GameOver game={game} socket={socket}/>}
                {!game && <Typography>Loading...</Typography>}
            </Box>
            <Box style={{width: "15vw"}}>
                <SocketContext.Consumer>
                    {socket => <Chat socket={socket}/>}
                </SocketContext.Consumer>
            </Box>
        </Box>
        
    </Box>
  )
}

export default GameHome