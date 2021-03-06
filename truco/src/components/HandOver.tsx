import { Button, Typography } from '@mui/material';

import { Game } from '../configs/types';
import React from 'react';
import { Socket } from 'socket.io-client';
import { useParams } from 'react-router';

type Props = {
    game: Game;
    socket: Socket | null;
}

const HandOver = (props: Props): React.ReactElement => {
    const { id } = useParams();
    const { game, socket } = props;
    const { handTrucoWinnerId, handEnvidoWinnerId, hostId, handTrucoPoints, handEnvidoPoints, handLiarId, otherId } = game;
    const [ready, setReady] = React.useState(false);

    const handleClick = () => {
        if (socket) {
            socket.emit('ready', id);
            setReady(true);
        }
        else throw new Error('Socket is null');
    }
    return(
        <div>
            <Typography>
                Hand Over!
            </Typography>
            <Typography>
                { handTrucoWinnerId === hostId ? 'Host' : 'Guest' } won { handTrucoPoints } Truco point{handTrucoPoints !==1 && 's'}
            </Typography>
            { handEnvidoPoints !== 0 &&  <Typography>
                { handEnvidoWinnerId === hostId ? 'Host' : 'Guest' } won { handEnvidoPoints } Envido point{handEnvidoPoints !==1 && 's'}
            </Typography>}
            <Typography>
                { handLiarId === hostId ? 'Host lied, Guest received 1 Lying point' : '' }
                { handLiarId === otherId ? 'Guest lied, Host received 1 Lying point' : ''}
            </Typography>
            { handLiarId === "both" ? <Typography>Both lied! No lying points</Typography> : ''}
            <Typography>
                Ready for next hand?
            </Typography>
            {ready && <Typography>waiting...</Typography>}
            {!ready && <Button onClick={handleClick}>Ready</Button>}

        </div>
    )
}

export default HandOver;