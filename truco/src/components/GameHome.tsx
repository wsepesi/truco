import React, { useEffect } from 'react'

import Board from './Board';
import Chat from './Chat';
import PointTracker from './PointTracker';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../hooks/socket-context';
import { Card, Game } from '../configs/types';
import { useParams } from 'react-router';

type Props = {
    socket: Socket | null
}

//TODO: ADD THE NAVBAR, BE ABLE TO PASS THE STATE VARIABLE LOGGED IN TO THIS PAGE

const GameHome = (props: Props) :React.ReactElement => {
    const { socket } = props;
    const { id } = useParams()

    const[hostId, setHostId] = React.useState<String>("");
    const[otherId, setOtherId] = React.useState<String>("");
    const[gameId, setGameId] = React.useState<String>("");
    
    const[hostPoints, setHostPoints] = React.useState<number>(0);
    const[otherPoints, setOtherPoints] = React.useState<number>(0);

    const[hostCards, setHostCards] = React.useState<Card[]>([]);
    const[otherCards, setOtherCards] = React.useState<Card[]>([]);
    const[trick1Cards, setTrick1Cards] = React.useState<Card[]>([]);
    const[trick2Cards, setTrick2Cards] = React.useState<Card[]>([]);
    const[trick3Cards, setTrick3Cards] = React.useState<Card[]>([]);

    const[hostHasDeck, setHostHasDeck] = React.useState<boolean>(false);
    const[hostTurn, setHostTurn] = React.useState<boolean>(true);
    const[canPlayCards, setCanPlayCards] = React.useState<boolean>(true);

    const[handTrucoPoints, setHandTrucoPoints] = React.useState<number>(1);
    const[handEnvidoPoints, setHandEnvidoPoints] = React.useState<number>(0);

    const[hostCalledEnvido, setHostCalledEnvido] = React.useState<boolean>(false);
    const[otherCalledEnvido, setOtherCalledEnvido] = React.useState<boolean>(false);
    const[hostEnvidoCon, setHostEnvidoCon] = React.useState<number>(0);
    const[otherEnvidoCon, setOtherEnvidoCon] = React.useState<number>(0);

    const[canCallTruco, setCanCallTruco] = React.useState<boolean>(true);
    const[canCallEnvido, setCanCallEnvido] = React.useState<boolean>(true);
    const[tempCanCallTruco, setTempCanCallTruco] = React.useState<boolean>(true);
    const[tempCanCallEnvido, setTempCanCallEnvido] = React.useState<boolean>(true);
    const[hostCanTrucoRespond, setHostCanTrucoRespond] = React.useState<boolean>(false);
    const[otherCanTrucoRespond, setOtherCanTrucoRespond] = React.useState<boolean>(false);
    const[hostCanRetrucoAfterQuiero, setHostCanRetrucoAfterQuiero] = React.useState<boolean>(false);
    const[otherCanRetrucoAfterQuiero, setOtherCanRetrucoAfterQuiero] = React.useState<boolean>(false);
    const[hostCanEnvidoRespond1, setHostCanEnvidoRespond1] = React.useState<boolean>(false);
    const[otherCanEnvidoRespond1, setOtherCanEnvidoRespond1] = React.useState<boolean>(false);
    const[hostCanEnvidoRespond2, setHostCanEnvidoRespond2] = React.useState<boolean>(false);
    const[otherCanEnvidoRespond2, setOtherCanEnvidoRespond2] = React.useState<boolean>(false);

    const updateAllStates = (game: Game) => {
        setHostPoints(game.hostPoints);
        setOtherPoints(game.otherPoints);

        setHostCards(game.hostCards);
        setOtherCards(game.otherCards);
        setTrick1Cards(game.trick1Cards);
        setTrick2Cards(game.trick2Cards);
        setTrick3Cards(game.trick3Cards);

        setHostHasDeck(game.hostHasDeck);
        setHostTurn(game.hostTurn);
        setCanPlayCards(game.canPlayCards);

        setHandTrucoPoints(game.handTrucoPoints);
        setHandEnvidoPoints(game.handEnvidoPoints);

        setHostCalledEnvido(game.hostCalledEnvido);
        setOtherCalledEnvido(game.otherCalledEnvido);
        setHostEnvidoCon(game.hostEnvidoCon);
        setOtherEnvidoCon(game.otherEnvidoCon);
        
        setCanCallTruco(game.canCallTruco);
        setCanCallEnvido(game.canCallEnvido);
        setTempCanCallTruco(game.tempCanCallTruco);
        setTempCanCallEnvido(game.tempCanCallEnvido);
        setHostCanTrucoRespond(game.hostCanTrucoRespond);
        setOtherCanTrucoRespond(game.otherCanTrucoRespond);
        setHostCanRetrucoAfterQuiero(game.hostCanRetrucoAfterQuiero);
        setOtherCanRetrucoAfterQuiero(game.otherCanRetrucoAfterQuiero);
        setHostCanEnvidoRespond1(game.hostCanEnvidoRespond1);
        setOtherCanEnvidoRespond1(game.otherCanEnvidoRespond1);
        setHostCanEnvidoRespond2(game.hostCanEnvidoRespond2);
        setOtherCanEnvidoRespond2(game.otherCanEnvidoRespond2);
    }

    useEffect(() => {
        if (socket) {
          socket.on("startGame", (game: Game, id: String) => {
            updateAllStates(game);
            setHostId(game.hostId);
            setOtherId(game.otherId);
            setGameId(id);
          })

          socket.on('updateAll', (game: Game) => {
            updateAllStates(game);
          })
    
          return () => {
            socket.off("startHand");
            socket.off("updateAll");
          }
        }
      }, [socket]);

  return (
    <div style={{display: "flex", justifyContent: "space-between", height: "100vh"}}>
        <div style={{width: "15vw"}}>
            {/* TODO: PASS THE USERNAMES TO THE POINT TRACKER TO DISPLAY IT */}
            <PointTracker
                hostPoints={hostPoints}
                otherPoints={otherPoints}
                handTrucoPoints={handTrucoPoints}
                handEnvidoPoints={handEnvidoPoints}
            />
        </div>
        <div style={{width: "70vw", borderLeft: "2px solid black", borderRight: "2px solid black"}}>
            <SocketContext.Consumer>
                {socket =>
                    <Board
                    socket={socket}
                    hostId={hostId}
                    otherId={otherId}
                    gameId={gameId}
    
                    hostCards={hostCards}
                    otherCards={otherCards}
                    trick1Cards={trick1Cards}
                    trick2Cards={trick2Cards}
                    trick3Cards={trick3Cards}
    
                    hostHasDeck={hostHasDeck}
                    hostTurn={hostTurn}
                    canPlayCards={canPlayCards}
    
                    hostCalledEnvido={hostCalledEnvido}
                    otherCalledEnvido={otherCalledEnvido}
                    hostEnvidoCon={hostEnvidoCon}
                    otherEnvidoCon={otherEnvidoCon}
    
                    canCallTruco={canCallTruco}
                    canCallEnvido={canCallEnvido}
                    tempCanCallTruco={tempCanCallTruco}
                    tempCanCallEnvido={tempCanCallEnvido}
                    hostCanTrucoRespond={hostCanTrucoRespond}
                    otherCanTrucoRespond={otherCanTrucoRespond}
                    hostCanRetrucoAfterQuiero={hostCanRetrucoAfterQuiero}
                    otherCanRetrucoAfterQuiero={otherCanRetrucoAfterQuiero}
                    hostCanEnvidoRespond1={hostCanEnvidoRespond1}
                    otherCanEnvidoRespond1={otherCanEnvidoRespond1}
                    hostCanEnvidoRespond2={hostCanEnvidoRespond2}
                    otherCanEnvidoRespond2={otherCanEnvidoRespond2}
                    />
                }
            </SocketContext.Consumer>
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