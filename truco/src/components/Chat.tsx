import { Button, Typography } from '@mui/material'
import React from 'react'

const Chat = () :React.ReactElement => {
  const sendChat = () => {
    //TODO:
  }

  return (
    <div>
      <div style={{textAlign: "center"}}>
        <Typography variant="h4" color="inherit">Chat</Typography>
      </div>
      <input type="text" id="chatText" style={{marginLeft: "5px"}} placeholder="Chat"></input>
      <Button onClick={sendChat}>Send</Button>
    </div>
  )
}

export default Chat