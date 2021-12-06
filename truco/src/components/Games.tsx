import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import Game from './Game'
import { Room } from '../configs/types';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket | null
}

const Games = (props: Props): React.ReactElement => {
  const { socket } = props;
  const [rooms, setRooms] = React.useState<Room[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("rooms", (rooms: Room[]) => {
        console.log("setting rooms", rooms)
        setRooms(rooms);
      });

      socket.emit('updateRooms');

      return () => {
        socket.off("chat");
      };
    }
  }, [socket]);

  return (
    <div>
      <Typography variant="h4">Join a game</Typography>
      <Box>
        {rooms && rooms.map(room => <Game room={room} socket={socket} key={room._id}/>)}
      </Box>
    </div>
  )
}

export default Games