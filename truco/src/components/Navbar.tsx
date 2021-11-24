import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { setSourceMapRange } from 'typescript'

type Props = {
  loggedIn: boolean
  setLoggedIn: any //FIXME:
}

const Navbar = (props:Props) :React.ReactElement => {
  const [loginOpen, setLoginOpen] = React.useState(false)

  const loginClick = () => {
    setLoginOpen(true)
  }

  const logoutClick = () => {
    props.setLoggedIn(false)
  }

  const closeLoginCancel = () => {
    setLoginOpen(false)
  }

  const closeLoginSuccess = () => {
    setLoginOpen(false)
    props.setLoggedIn(true)
  }

  return (
    <div>
      <Box sx={{display: "flex", height: "64px", flexGrow: 1}}>
        <AppBar position="fixed">
          <Toolbar>
              <Typography variant="h6" color="inherit" sx={{ mr: 10 }}>Truco</Typography>
              <Button color="inherit" sx={{mr: 5}}>Home</Button>
              <Button color="inherit" sx={{mr: "auto"}}>Rules</Button>
              {props.loggedIn ? <Button color="inherit" onClick={logoutClick}>Logout</Button> : <Button color="inherit" onClick={loginClick}>Login</Button>}
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