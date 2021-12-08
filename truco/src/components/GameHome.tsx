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

// import { useParams } from 'react-router';

type Props = {
    socket: Socket | null
}

//TODO: ADD THE NAVBAR, BE ABLE TO PASS THE STATE VARIABLE LOGGED IN TO THIS PAGE

const GameHome = (props: Props) :React.ReactElement => {
    const { socket } = props;
    // const { id } = useParams();

    const [game, setGame] = React.useState<Game>();

    const endOfGame = game ? game.endOfGame : false;
    const endOfHand = game ? game.endOfHand : false;

    const updateAllStates = (game: Game) => {
        setGame(game);
    }

    useEffect(() => {
        if (socket) {
          socket.on("startGame", (game: Game) => {
            console.log("startGame", game);
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
                {/* TODO: PASS THE USERNAMES TO THE POINT TRACKER TO DISPLAY IT */}
                {game && <PointTracker
                    hostPoints={game.hostPoints}
                    otherPoints={game.otherPoints}
                    handTrucoPoints={game.handTrucoPoints}
                    handEnvidoPoints={game.handEnvidoPoints}
                />}
            </Box>
            <Box style={{width: "70vw", borderLeft: "2px solid black", borderRight: "2px solid black"}}>
                {(game && !(endOfGame || endOfHand)) && <SocketContext.Consumer>
                    {socket =>
                        <Board
                            socket={socket}
                            game={game}
                        />
                    }
                </SocketContext.Consumer>}
                {(game && endOfHand) && <HandOver game={game} socket={socket}/>}
                {(game && endOfGame) && <GameOver game={game} socket={socket}/>}
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