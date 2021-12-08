import { Button, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import { Navigate } from 'react-router'
import { Room } from '../configs/types'
import { Socket } from 'socket.io-client'

type Props = {
  room: Room
  socket: Socket | null,
  loggedIn: boolean
}

const Game = (props:Props) :React.ReactElement => {
  const [redirect, setRedirect] = React.useState<string>('');

  const { socket, room, loggedIn } = props;

  useEffect(() => {
    if (socket) {
      socket.on("readyToStart", (id: string) => {
        // REDIRECT TO GAME
        socket.emit('updateRooms');
        setRedirect(`/room/${id}`);

        // SIGNAL TO START
        socket.emit('startGame', id);
      });

      return () => {
        socket.off("readyToStart");
      };
    }
  }, [socket]);

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
    // const result: AxiosResponse<RoomResult> = await axios({
    //   method: 'put',
    //   url: `${BASE_URL}db/rooms/${id}`,
    //   data: {
    //     playerId: socket.id
    //   }
    // });

    // if (!result.data.success) {
    //   alert(result.data.msg);
    //   return;
    // }

    // // REDIRECT TO GAME
    // socket.emit('updateRooms');
    // setRedirect(`/room/${id}`);

    // // SIGNAL TO START
    // socket.emit('startGame', id);
  }

  return (
    <Paper sx={{margin: '10px 10px', height: '15vh', width: '15vw'}} elevation={3}>
        <Typography variant='h5' align='center'>{room.name}</Typography>
        <Typography>Host: {room.host.name}</Typography>
        <Typography>Players: {room.users?.length} / 2</Typography>
        <Button onClick={joinRoom}>{(room.users?.length && room.users.length < 2) && loggedIn ? "Join Game" : "Spectate"}</Button>
        {redirect && <Navigate to={redirect} />}
    </Paper>
  )
}

export default Game