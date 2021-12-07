import { Button, Typography } from '@mui/material';

import { Game } from '../configs/types';
import React from 'react';
import { Socket } from 'socket.io-client';

type Props = {
    game: Game;
    socket: Socket | null;
}

const GameOver = (props: Props): React.ReactElement => {
    const { hostPoints, otherPoints } = props.game;
    const [ready, setReady] = React.useState(false);

    const handleClick = () => {
        if (props.socket) {
            setReady(true);
        }
    }
    return(
        <div>
            <Typography>
                Game Over!
            </Typography>
            <Typography>
                { hostPoints > otherPoints ? "Host" : "Other"} player won the game, score was:
                Host: {hostPoints}
                Other: {otherPoints}
            </Typography>
            <Typography>
                Play again?
            </Typography>
            {ready && <Typography>waiting...</Typography>}
            {!ready && <Button onClick={handleClick}>Ready</Button>}
        </div>
    )
}

export default GameOver;