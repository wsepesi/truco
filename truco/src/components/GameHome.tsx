import React, { useEffect } from 'react'

import Board from './Board';
import Chat from './Chat';
import PointTracker from './PointTracker';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../hooks/socket-context';

type Props = {
    socket: Socket | null
}

//TODO: ADD THE NAVBAR, BE ABLE TO PASS THE STATE VARIABLE LOGGED IN TO THIS PAGE

const GameHome = (props: Props) :React.ReactElement => {
    const { socket } = props;
    
    const[trucoCalled, setTrucoCalled] = React.useState(false)
    const[envidoCalled, setEnvidoCalled] = React.useState(false)
    const[trucoPoints, setTrucoPoints] = React.useState(1)
    const[envidoPoints, setEnvidoPoints] = React.useState(0)
    const[ownerPoints, setOwnerPoints] = React.useState(0)
    const[otherPoints, setOtherPoints] = React.useState(0)

    useEffect(() => {
        if (socket) {
          socket.on("x", (data) => {
            
          })

          socket.on('y', () => {

          })
    
          return () => {
            socket.off("x");
            socket.off("y");
          }
        }
      }, [socket]);

  return (
    <div style={{display: "flex", justifyContent: "space-between", height: "100vh"}}>
        <div style={{width: "15vw"}}>
            <PointTracker
                trucoPoints={trucoPoints}
                setTrucoPoints={setTrucoPoints}
                envidoPoints={envidoPoints}
                setEnvidoPoints={setEnvidoPoints}
                ownerPoints={ownerPoints}
                setOwnerPoints={setOwnerPoints}
                otherPoints={otherPoints}
                setOtherPoints={setOtherPoints}
            />
        </div>
        <div style={{width: "70vw", borderLeft: "2px solid black", borderRight: "2px solid black"}}>
            <Board
                trucoCalled={trucoCalled}
                setTrucoCalled={setTrucoCalled}
                envidoCalled={envidoCalled}
                setEnvidoCalled={setEnvidoCalled}
            />
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