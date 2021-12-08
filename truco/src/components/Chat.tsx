import { Button, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import { Socket } from 'socket.io-client'
import { useParams } from 'react-router'

//TODO: users should show up w messages

type Props = {
  socket: Socket | null
}

type sChat = {
  msg: string,
  id: string
}

const Chat = (props: Props): React.ReactElement => {
  const { id } = useParams()
  const [msg, setMsg] = React.useState<string>('');
  const [messages, setMessages] = React.useState<string[]>([]);

  const { socket } = props;

  useEffect(() => {
    if (socket) {
      socket.on("chat", (data: sChat) => {
        const msg = `${data.id === socket.id ? 'You' : 'Opponent'}: ${data.msg}`
        setMessages(messages => [...messages, msg]);
      })

      return () => {
        socket.off("chat");
      }
    }
  }, [socket]);

  const sendChat = () => {
    const message = msg
    setMsg('');
    // addMsg(message);
    if (socket) socket.emit('chat', {
      msg: message,
      room: id
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
