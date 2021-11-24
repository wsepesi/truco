import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Navbar = () :React.ReactElement => {
  return (
    <div>
        <AppBar position="fixed">
            <Box sx={{flexGrow: 1}}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" sx={{ mr: 10 }}>Truco</Typography>
                    <Button color="inherit" sx={{mr: 5}}>Home</Button>
                    <Button color="inherit" sx={{mr: "auto"}}>Rules</Button>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </Box>
        </AppBar>
    </div>
  )
}

export default Navbar