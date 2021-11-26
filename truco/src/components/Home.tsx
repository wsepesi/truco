import React from 'react'
import Games from './Games'
import Host from './Host'
import Navbar from './Navbar'

const Home = () :React.ReactElement => {
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
    </div>
  )
}

export default Home