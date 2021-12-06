import Games from './Games'
import Host from './Host'
import Navbar from './Navbar'
import React from 'react'
import { Socket } from 'socket.io-client'
import { Typography } from '@mui/material'

type Props = {
  socket: Socket | null
}
const Home = (props: Props) :React.ReactElement => {
  const[loggedIn, setLoggedIn] = React.useState(false)
  const[currentUser, setCurrentUser] = React.useState("")

  return (
    <div>
        <Navbar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          socket={props.socket}
        />
        {loggedIn ? (
          <div>
            <Host
              socket={props.socket}
            />
            <Games socket={props.socket}/>
          </div>
        ) : <Typography>Please log in</Typography>}
    </div>
  )
}

export default Home