import Games from './Games'
import Host from './Host'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import React from 'react'
import { SocketContext } from '../hooks/socket-context'

type Props = {
  
}
const Home = (props: Props) :React.ReactElement => {
  const[loggedIn, setLoggedIn] = React.useState(false)
  const[currentUser, setCurrentUser] = React.useState("")

  return (
    <div>
      <SocketContext.Consumer>
        { socket =>
          <Navbar
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            socket={socket}
          />
        }
        </SocketContext.Consumer>
        {loggedIn ? (
          <div>
            <Host
              currentUser={currentUser}
            />
            <Games />
            <Link to="/test">Test</Link>
          </div>
        ) : null}
    </div>
  )
}

export default Home