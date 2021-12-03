import React from 'react'
import { Socket } from 'socket.io-client';
import Board from './Board';
import Chat from './Chat';
import PointTracker from './PointTracker';

type Props = {
    socket: Socket
}

const GameHome = (props: Props) :React.ReactElement => {
    const[trucoCalled, setTrucoCalled] = React.useState(false)
    const[envidoCalled, setEnvidoCalled] = React.useState(false)
    const[trucoPoints, setTrucoPoints] = React.useState(1)
    const[envidoPoints, setEnvidoPoints] = React.useState(0)
    const[ownerPoints, setOwnerPoints] = React.useState(0)
    const[otherPoints, setOtherPoints] = React.useState(0)

  return (
    <div style={{display: "flex", justifyContent: "space-between", height: "100vw"}}>
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
            <Chat socket={props.socket}/>
        </div>
    </div>
  )
}

export default GameHome