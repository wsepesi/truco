import { Button, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import { Socket } from 'socket.io-client'

//TODO: users should show up w messages

type Props = {
  socket: Socket
}

type sChat = {
  msg: string,
}

const Chat = (props: Props): React.ReactElement => {
  const [msg, setMsg] = React.useState<string>('');
  const [messages, setMessages] = React.useState<string[]>([]);

  const { socket } = props;

  useEffect(() => {
    socket.on("chat", (data: sChat) => {
      setMessages(messages => [...messages, data.msg]);
    })

    return () => {
      socket.off("chat");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  
  }, [socket]);

  const sendChat = () => {
    const message = msg
    setMsg('');
    // addMsg(message);
    if (socket) socket.emit('chat', {
      msg: message
    })
    else (alert("no socket"))
  }

  const toComponents = (messages: string[]): React.ReactElement[] => {
    // console.log()
    return messages.slice(-10).map((msg: string, i: number) => <Typography key={i}>{msg}</Typography>)
  }

  return (
    <div>
      <div style={{textAlign: "center"}}>
        <Typography variant="h4" color="inherit">Chat</Typography>
      </div>
      <div>
        {messages ? toComponents(messages) : null}
      </div>
      <TextField variant="standard" style={{marginLeft: "5px"}} value={msg} onChange={(e) => setMsg(e.target.value)}/>
      {/* <input type="text" id="chatText"  placeholder="Chat"></input> */}
      <Button onClick={sendChat}>Send</Button>
    </div>
  )
}

export default Chat
