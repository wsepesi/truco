import { Box, Skeleton } from '@mui/material'

import Games from './Games'
import Host from './Host'
import Leaderboard from './Leaderboard'
import Navbar from './Navbar'
import React from 'react'
import { SYSTEM_COLORS } from '../configs/colors'
import { Socket } from 'socket.io-client'
import useGetUsers from '../hooks/getUsers'

type Props = {
  socket: Socket | null
}
const Home = (props: Props) :React.ReactElement => {
  const[loggedIn, setLoggedIn] = React.useState(false)
  const[currentUser, setCurrentUser] = React.useState("")

  const { data, status, refetch } = useGetUsers();

  return (
    <Box sx={{backgroundColor: SYSTEM_COLORS.BACKGROUND, height: '100vh'}}>
        <Navbar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          socket={props.socket}
        />
        <Box sx={{padding: '50px 0px', display: 'flex', width: '100vw', flex: 'column', justifyContent: 'space-around'}}>
          <Host
            socket={props.socket}
            loggedIn={loggedIn}
          />
          <Games socket={props.socket} loggedIn={loggedIn}/>
        </Box>
        {status === "success" && data ? <Leaderboard users={data} refetch={refetch}/> : 
            <Skeleton variant="rectangular" width={1000} height={250}/>}
    </Box>
  )
}

export default Home