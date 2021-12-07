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
    const { handTrucoWinnerId, handEnvidoWinnerId, hostId, handTrucoPoints, handEnvidoPoints} = game;
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
                { handTrucoWinnerId === hostId ? 'Host' : 'Other' } won { handTrucoPoints } points with Truco
                { handEnvidoWinnerId === hostId ? 'Host' : 'Other' } won { handEnvidoPoints } points with Envido
                { /* LYING POINTS */}
            </Typography>
            <Typography>
                Ready for next hand?
            </Typography>
            {ready && <Typography>waiting...</Typography>}
            {!ready && <Button onClick={handleClick}>Ready</Button>}

        </div>
    )
}

export default HandOver;