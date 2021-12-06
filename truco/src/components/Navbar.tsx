import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Toolbar, Typography } from '@mui/material'
import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../configs/vars';
import React from 'react'
import { Socket } from 'socket.io-client';
import { User } from '../configs/types';

type Props = {
  loggedIn: boolean
  setLoggedIn: any //FIXME:
  currentUser: String
  setCurrentUser: any //FIXME:
  socket: Socket | null
}

type LoginResult = {
  msg: string,
  success: boolean,
  id?: string
}

const Navbar = (props:Props): React.ReactElement => {
  const { socket } = props;
  const [username, setUsername] = React.useState<string>('');
  const [loginOpen, setLoginOpen] = React.useState<boolean>(false);

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

  const serverLogin = async (username: string): Promise<boolean> => {
    if (!socket) return false; //FIXME:
    const user: User = {
      name: username,
      socketId: socket.id
    }
    console.log(user)
    const result: AxiosResponse<LoginResult> = await axios({
        method: 'post',
        url: `${BASE_URL}db/users`,
        data: user
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { success, id } = result.data;
    return success;
  }

  const closeLoginSuccess = async () => {
    console.log("closeLoginSuccess")
    const res = await serverLogin(username);
    if (res) {
      setLoginOpen(false)
      props.setLoggedIn(true)
      props.setCurrentUser(username)
      setUsername('');
    } else {
      alert("Login failed");
      setLoginOpen(false);
    }
    
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
                    onChange={(e) => setUsername(e.target.value)}
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