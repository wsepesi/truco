import React, { useEffect } from 'react'

import Board from './Board';
import Chat from './Chat';
import { Game } from '../configs/types';
import GameOver from './GameOver';
import HandOver from './HandOver';
import PointTracker from './PointTracker';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../hooks/socket-context';

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
    <div style={{display: "flex", justifyContent: "space-between", height: "100vh"}}>
        <div style={{width: "15vw"}}>
            {/* TODO: PASS THE USERNAMES TO THE POINT TRACKER TO DISPLAY IT */}
            {game && <PointTracker
                hostPoints={game.hostPoints}
                otherPoints={game.otherPoints}
                handTrucoPoints={game.handTrucoPoints}
                handEnvidoPoints={game.handEnvidoPoints}
            />}
        </div>
        <div style={{width: "70vw", borderLeft: "2px solid black", borderRight: "2px solid black"}}>
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
            {!game && <div>Loading...</div>}
        </div>
        <div style={{width: "15vw"}}>
            <SocketContext.Consumer>
                {socket => <Chat socket={socket}/>}
            </SocketContext.Consumer>
        </div>
    </div>
  )
}

export default GameHome