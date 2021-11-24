import React from 'react'
import Games from './Games'
import Host from './Host'
import Navbar from './Navbar'

const Home = () :React.ReactElement => {
  const[loggedIn, setLoggedIn] = React.useState(false)

  return (
    <div>
      <Navbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Host />
      <Games />
    </div>
  )
}

export default Home