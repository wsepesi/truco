import { AppBar } from '@mui/material'
import React from 'react'
import Games from './Games'
import Host from './Host'
import Navbar from './Navbar'

const Home = () :React.ReactElement => {
  return (
    <div>
      <Navbar />
      <Host />
      <Games />
    </div>
  )
}

export default Home