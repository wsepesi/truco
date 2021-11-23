import React, { MouseEventHandler } from 'react';

import { Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { useState } from 'react';

type Props = {
    socket: Socket
}
const Test = (props: Props): React.ReactElement => {
    const [message, setMessage] = useState<string>('');

    const sendHello: MouseEventHandler<HTMLButtonElement> = () => {
        console.log('sending hello');
        if(props.socket) props.socket.emit('hello', 'hello');
        else alert('ERROR');
    }
    
    props.socket.on('ping', (msg) => {
        console.log('ping pong');
        if (msg) setMessage(msg);
    });

    return(
        <div className="Test">
            <h1>Test page</h1>
            <Link to="/">Home</Link>
            <p>{message}</p>
            <button onClick={sendHello}>Send Hello</button>
        </div>)
}

export default Test;