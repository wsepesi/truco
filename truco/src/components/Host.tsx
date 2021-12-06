import { Button, TextField } from '@mui/material';
import { Room, User } from '../configs/types';
import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../configs/vars';
import { Navigate } from 'react-router-dom';
import React from 'react'
import { Socket } from 'socket.io-client';
import { getUser } from '../hooks/getUser';

type Props = {
  socket: Socket | null
}

type RoomResult = {
  msg: string,
  success: boolean,
  id: string
}

const Host = (props: Props): React.ReactElement => {
  const { socket } = props;
  const [redirect, setRedirect] = React.useState<string>('');
  const [roomName, setRoomName] = React.useState<string>('');

  const handleClick = async () => {
    // CREATE ROOM IN DATABASE
    console.log('creating room');
    if (!socket) {
      alert('Socket is not connected');
      return;
    }

    const user: User | null = await getUser(socket.id);

    if(!user) {
      alert('User not found');
      return;
    }

    console.log(user);

    const room: Room = {
      name: roomName,
      host: user
    };

    console.log(room);

    const result: AxiosResponse<RoomResult> = await axios({
      method: 'post',
      url: `${BASE_URL}db/rooms`,
      data: room
    });

    const { success, id } = result.data;
    if (!success) alert('Error creating room');

    // ALERT SOCKET OF THE CHANGE, ADD USER TO ROOM IN SOCKET
    socket.emit('joinRoom', id);
    socket.emit('updateRooms');

    // REDIRECT TO ROOM
    setRedirect(`/room/${id}`);
  }

  return (
    <div>
      <TextField
        label="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <Button disabled={roomName.length === 0} onClick={handleClick}>Host a Game</Button>
      {redirect && <Navigate to={redirect} />}
    </div>
  )
}

export default Host