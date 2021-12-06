import React, { useEffect } from 'react'

import Board from './Board';
import Chat from './Chat';
import { Game } from '../configs/types';
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

    // const[hostId, setHostId] = React.useState<String>("");
    // const[otherId, setOtherId] = React.useState<String>("");
    // const[gameId, setGameId] = React.useState<String>(id ? id : "");
    
    // const[hostPoints, setHostPoints] = React.useState<number>(0);
    // const[otherPoints, setOtherPoints] = React.useState<number>(0);

    // const[hostCards, setHostCards] = React.useState<TrucoCard[]>([]);
    // const[otherCards, setOtherCards] = React.useState<TrucoCard[]>([]);
    // const[trick1Cards, setTrick1Cards] = React.useState<TrucoCard[]>([]);
    // const[trick2Cards, setTrick2Cards] = React.useState<TrucoCard[]>([]);
    // const[trick3Cards, setTrick3Cards] = React.useState<TrucoCard[]>([]);

    // const[hostHasDeck, setHostHasDeck] = React.useState<boolean>(false);
    // const[hostTurn, setHostTurn] = React.useState<boolean>(true);
    // const[canPlayCards, setCanPlayCards] = React.useState<boolean>(true);

    // const[handTrucoPoints, setHandTrucoPoints] = React.useState<number>(1);
    // const[handEnvidoPoints, setHandEnvidoPoints] = React.useState<number>(0);

    // const[hostCalledEnvido, setHostCalledEnvido] = React.useState<boolean>(false);
    // const[otherCalledEnvido, setOtherCalledEnvido] = React.useState<boolean>(false);
    // const[hostEnvidoCon, setHostEnvidoCon] = React.useState<number>(0);
    // const[otherEnvidoCon, setOtherEnvidoCon] = React.useState<number>(0);

    // const[canCallTruco, setCanCallTruco] = React.useState<boolean>(false);
    // const[canCallEnvido, setCanCallEnvido] = React.useState<boolean>(false);
    // const[tempCanCallTruco, setTempCanCallTruco] = React.useState<boolean>(true);
    // const[tempCanCallEnvido, setTempCanCallEnvido] = React.useState<boolean>(true);
    // const[hostCanTrucoRespond, setHostCanTrucoRespond] = React.useState<boolean>(false);
    // const[otherCanTrucoRespond, setOtherCanTrucoRespond] = React.useState<boolean>(false);
    // const[hostCanRetrucoAfterQuiero, setHostCanRetrucoAfterQuiero] = React.useState<boolean>(false);
    // const[otherCanRetrucoAfterQuiero, setOtherCanRetrucoAfterQuiero] = React.useState<boolean>(false);
    // const[hostCanEnvidoRespond1, setHostCanEnvidoRespond1] = React.useState<boolean>(false);
    // const[otherCanEnvidoRespond1, setOtherCanEnvidoRespond1] = React.useState<boolean>(false);
    // const[hostCanEnvidoRespond2, setHostCanEnvidoRespond2] = React.useState<boolean>(false);
    // const[otherCanEnvidoRespond2, setOtherCanEnvidoRespond2] = React.useState<boolean>(false);

    const updateAllStates = (game: Game) => {
        setGame(game);
        // setHostPoints(game.hostPoints);
        // setOtherPoints(game.otherPoints);

        // setHostCards(game.hostCards);
        // setOtherCards(game.otherCards);
        // setTrick1Cards(game.trick1Cards);
        // setTrick2Cards(game.trick2Cards);
        // setTrick3Cards(game.trick3Cards);

        // setHostHasDeck(game.hostHasDeck);
        // setHostTurn(game.hostTurn);
        // setCanPlayCards(game.canPlayCards);

        // setHandTrucoPoints(game.handTrucoPoints);
        // setHandEnvidoPoints(game.handEnvidoPoints);

        // setHostCalledEnvido(game.hostCalledEnvido);
        // setOtherCalledEnvido(game.otherCalledEnvido);
        // setHostEnvidoCon(game.hostEnvidoCon);
        // setOtherEnvidoCon(game.otherEnvidoCon);
        
        // setCanCallTruco(game.canCallTruco);
        // setCanCallEnvido(game.canCallEnvido);
        // setTempCanCallTruco(game.tempCanCallTruco);
        // setTempCanCallEnvido(game.tempCanCallEnvido);
        // setHostCanTrucoRespond(game.hostCanTrucoRespond);
        // setOtherCanTrucoRespond(game.otherCanTrucoRespond);
        // setHostCanRetrucoAfterQuiero(game.hostCanRetrucoAfterQuiero);
        // setOtherCanRetrucoAfterQuiero(game.otherCanRetrucoAfterQuiero);
        // setHostCanEnvidoRespond1(game.hostCanEnvidoRespond1);
        // setOtherCanEnvidoRespond1(game.otherCanEnvidoRespond1);
        // setHostCanEnvidoRespond2(game.hostCanEnvidoRespond2);
        // setOtherCanEnvidoRespond2(game.otherCanEnvidoRespond2);
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
            {game && <SocketContext.Consumer>
                {socket =>
                    <Board
                        socket={socket}
                        game={game}
                    />
                }
            </SocketContext.Consumer>}
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