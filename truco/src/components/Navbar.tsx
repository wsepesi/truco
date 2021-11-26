import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'

type Props = {
  loggedIn: boolean
  setLoggedIn: any //FIXME:
  currentUser: String
  setCurrentUser: any //FIXME:
}

const Navbar = (props:Props) :React.ReactElement => {
  const [loginOpen, setLoginOpen] = React.useState(false)

  const loginClick = () => {
    setLoginOpen(true)
  }

  const logoutClick = () => {
    props.setLoggedIn(false)
    props.setCurrentUser("")
  }

  const closeLoginCancel = () => {
    setLoginOpen(false)
  }

  const closeLoginSuccess = () => {
    setLoginOpen(false)
    props.setLoggedIn(true)
    props.setCurrentUser("something")
    //TODO: CHECK IF THE USERNAME ALREADY EXISTS
      //I AM NOT SURE HOW TO ACCESS THE FORM THAT THE USER IS TYPING INTO
  }

  return (
    <div>
      <Box sx={{display: "flex", height: "64px", flexGrow: 1}}>
        <AppBar position="fixed">
          <Toolbar>
              <Typography variant="h6" color="inherit" sx={{ mr: 10 }}>Truco</Typography>
              <Button color="inherit" sx={{mr: 5}}>Home</Button>
              <Button color="inherit" sx={{mr: "auto"}}>Rules</Button>
              {props.loggedIn
                ? <span><Box sx={{ display: { xs: 'none', md: 'flex' } }}><Typography variant="h6" color="inherit">Username: {props.currentUser}</Typography><Button color="inherit" onClick={logoutClick} sx={{ml: 5}}>Logout</Button></Box></span>
                : <Button color="inherit" onClick={loginClick}>Login</Button>}
              <Dialog open={loginOpen} onClose={closeLoginCancel}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                  <DialogContentText>Enter your username:</DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeLoginCancel}>Cancel</Button>
                  <Button onClick={closeLoginSuccess}>Login</Button>
                </DialogActions>
              </Dialog>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Navbar