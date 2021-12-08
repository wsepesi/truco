import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import Game from './Game'
import { Room } from '../configs/types';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket | null,
  loggedIn: boolean,
}

const Games = (props: Props): React.ReactElement => {
  const { socket, loggedIn } = props;
  const [rooms, setRooms] = React.useState<Room[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("rooms", (rooms: Room[]) => {
        // console.log("setting rooms", rooms)
        setRooms(rooms);
      });

      socket.emit('updateRooms');

      return () => {
        socket.off("rooms");
      };
    }
  }, [socket]);

  return (
    <Paper>
      <Typography align='center' variant="h4">Games</Typography>
      <Box sx={{justifyContent: 'center'}}>
        {rooms && rooms.map(room => <Game loggedIn={loggedIn} room={room} socket={socket} key={room._id}/>)}
      </Box>
      {!loggedIn && <Typography align='center' variant="h6">You must be logged in to play a game</Typography>}
    </Paper>
  )
}

export default Games