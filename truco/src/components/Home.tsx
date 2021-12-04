import Games from './Games'
import Host from './Host'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import React from 'react'
import { Socket } from 'socket.io-client'

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
      />
      <Host
        currentUser={currentUser}
      />
      <Games />
      <Link to="/test">Test</Link>
    </div>
  )
}

export default Home