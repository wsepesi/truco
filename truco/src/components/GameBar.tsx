import { AppBar, Box, Button, Dialog, DialogContentText, Toolbar, Typography } from '@mui/material';
import { Navigate, useParams } from 'react-router';

import { Game } from '../configs/types';
import React from 'react'
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket | null,
  game: Game | undefined
}

const GameBar = (props:Props): React.ReactElement => {
    const started = props.game ? true : false;
    const over = props.game && props.game.endOfGame
    const { id } = useParams();
    const { socket } = props;
    const [warningOpen, setWarningOpen] = React.useState(false);
    const [leave, setLeave] = React.useState(false);

    const handleForfeit = () => {
        if (socket) {
        socket.emit('forfeit', id);
        }
    }

    const handleLeave = () => {
        if (socket) {
            socket.emit('leave', { id, started });
            setLeave(true);
        }
    }

    const handleWarn = () => {
        if (!started || over) handleLeave();
        else setWarningOpen(true);
    }

    return (
        <Box sx={{display: "flex", height: "10vh", flexGrow: 1}}>
            <AppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'space-between'}}>
                    <Typography variant="h6" color="inherit" sx={{ mr: 10 }}>Truco</Typography>
                    <div>
                    {(started && !over) && <Button onClick={handleForfeit}>Forfeit?</Button>}
                    <Button onClick={handleWarn}>Leave?</Button>
                    </div>
                    <Dialog open={warningOpen} onClose={() => setWarningOpen(false)}>
                        <DialogContentText>Leaving will forfeit the game... are you sure?</DialogContentText>
                        <Button onClick={handleLeave}>Yes</Button>
                        <Button onClick={() => setWarningOpen(false)}>No</Button>
                    </Dialog>
            </Toolbar>
            </AppBar>
            {leave && <Navigate to="/" />}
        </Box>
    )
}

export default GameBar