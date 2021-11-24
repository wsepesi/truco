import { AppBar } from '@mui/material'
import React from 'react'
import Games from './Games'
import Navbar from './Navbar'

const Home = () :React.ReactElement => {
  return (
    <div>
      <Navbar />
      <Games />
    </div>
  )
}

export default Home