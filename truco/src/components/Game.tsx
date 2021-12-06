import { Button, Typography } from '@mui/material'
import axios, { AxiosResponse } from 'axios'

import { BASE_URL } from '../configs/vars'
import { Navigate } from 'react-router'
import React from 'react'
import { Room } from '../configs/types'
import { Socket } from 'socket.io-client'

type Props = {
  room: Room
  socket: Socket | null
}

type RoomResult = {
  msg: string,
  success: boolean,
  id: string
}

const Game = (props:Props) :React.ReactElement => {
  const [redirect, setRedirect] = React.useState<string>('');

  const { socket, room } = props;
  const joinRoom = async () => {
    console.log(room);
    const id = room._id;
    console.log(id);
    if(!socket) {
      alert('No socket')
      return
    }
    // JOIN ROOM IN SOCKET
    socket.emit('joinRoom', id);

    // JOIN ROOM IN DB
    const result: AxiosResponse<RoomResult> = await axios({
      method: 'put',
      url: `${BASE_URL}db/rooms/${id}`,
      data: {
        playerId: socket.id
      }
    });

    if (!result.data.success) {
      alert(result.data.msg);
      return;
    }

    // REDIRECT TO GAME
    socket.emit('updateRooms');
    setRedirect(`/room/${id}`);

    // SIGNAL TO START
    socket.emit('startHand', id);
  }

  return (
    <div>
        <Typography>Room Name: {room.name}</Typography>
        <Typography>Game Owner: {room.host.name}</Typography>
        <Typography>Players: {room.users?.length}</Typography>
        <Button onClick={joinRoom}>{room.users?.length && room.users.length < 2 ? "Join Game" : "Spectate"}</Button>
        {redirect && <Navigate to={redirect} />}
    </div>
  )
}

export default Game