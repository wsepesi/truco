import { Button, Typography } from '@mui/material';

import { Game } from '../configs/types';
import React from 'react';
import { Socket } from 'socket.io-client';
import { useParams } from 'react-router';

type Props = {
    game: Game;
    socket: Socket | null;
}

const GameOver = (props: Props): React.ReactElement => {
    const { id } = useParams();
    const { hostPoints, otherPoints } = props.game;
    const [ready, setReady] = React.useState(false);

    const forfeit = hostPoints === -1 || otherPoints === -1;

    const handleClick = () => {
        if (props.socket) {
            console.log(id);
            props.socket.emit('overReady', id);
            setReady(true);
        }
    }
    return(
        <div>
            <Typography>
                Game Over!
            </Typography>
            {forfeit ? (
                <Typography>
                    The game was forfeited by {hostPoints === -1 ? 'the host' : 'the guest'}
                </Typography>
             ) : (
                <Typography> 
                    {hostPoints > otherPoints ? "Host" : "Guest"} player won the game, score was: \n
                    Host: {hostPoints} \n
                    Other: {otherPoints}
                </Typography>
            )}
            <Typography>
                Play again?
            </Typography>
            {ready && <Typography>waiting...</Typography>}
            {!ready && <Button onClick={handleClick}>Ready</Button>}
        </div>
    )
}

export default GameOver;