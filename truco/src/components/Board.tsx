import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'

import Cards from './Cards'
import CardsPlayed from './CardsPlayed'
import { Game } from '../configs/types'
import React from 'react'
import { Socket } from 'socket.io-client'

type Props = {
  socket: Socket | null;
  game: Game | undefined,
  isSpectator: boolean;
}

const Board = (props: Props) :React.ReactElement => {
  const { socket, game, isSpectator } = props
  if(!game) throw new Error('Game not defined');
  const id = socket ? socket.id : '';
  const isHost = game ? game.hostId === id : false;

  const [quieroConOpen, setQuieroConOpen] = React.useState<boolean>(false);
  const [quieroConNumber, setQuieroConNumber] = React.useState<number>(0);
  const [tengoOpen, setTengoOpen] = React.useState<boolean>(false);
  const [tengoNumber, setTengoNumber] = React.useState<number>(0);

  const quieroConClick = () => {
    setQuieroConOpen(true);
  }
  const tengoClick = () => {
    setTengoOpen(true);
  }
  const closeQuieroConCancel = () => {
    setQuieroConOpen(false);
  }
  const closeTengoCancel = () => {
    setTengoOpen(false);
  }
  const closeQuieroConSuccess = () => {
    setQuieroConOpen(false)
    if (quieroConNumber < 20 || quieroConNumber > 33) {
      alert("Invalid Envido Number");
      setQuieroConNumber(0);
      return;
    }
    handleQuieroCon(quieroConNumber);
  }
  const closeTengoSuccess = () => {
    setTengoOpen(false)
    if (isHost) {
      if (tengoNumber < game.otherEnvidoCon || (tengoNumber === game.otherEnvidoCon && !game.hostHasDeck) || tengoNumber > 33) {
        alert("Invalid Tengo Number");
        setTengoNumber(0);
        return;
      }
      if (game.hostHasFlor) {
        alert("Cannot use this function when you have flor");
        setTengoNumber(0);
        return;
      }
      if (game.otherHasFlor && !game.hostHasFlor) {
        alert("Cannot use this function when you don't have flor and your opponent does");
        setTengoNumber(0);
        return;
      }
    }
    else {
      if (tengoNumber < game.hostEnvidoCon || (tengoNumber === game.hostEnvidoCon && game.hostHasDeck) || tengoNumber > 33) {
        alert("Invalid Tengo Number");
        setTengoNumber(0);
        return;
      }
      if (game.otherHasFlor) {
        alert("Cannot use this function when you have flor");
        setTengoNumber(0);
        return;
      }
      if (game.hostHasFlor && !game.otherHasFlor) {
        alert("Cannot use this function when you don't have flor and your opponent does");
        setTengoNumber(0);
        return;
      }
    }
    handleTengo(tengoNumber);
  }

  const trucoCalled = () => {
    if (socket) socket.emit('trucoCalled', {
      gameId: game.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const envidoCalled = () => {
    if (socket) socket.emit('envidoCalled', {
      gameId: game.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const trucoQuieroCalled = () => {
    if (socket) socket.emit('trucoQuieroCalled', {
      gameId: game.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const trucoNoQuieroCalled = () => {
    if (socket) socket.emit('trucoNoQuieroCalled', {
      gameId: game.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const retrucoCalled = () => {
    if (socket) socket.emit('retrucoCalled', {
      gameId: game.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const handleQuieroCon = (quieroConNumber: number) => {
    if (socket) socket.emit('quieroConCalled', {
      gameId: game.gameId,
      userId: id,
      number: quieroConNumber
    })
    else (alert("no socket"))
  }

  const envidoNoQuieroCalled = () => {
    if (socket) socket.emit('envidoNoQuieroCalled', {
      gameId: game.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const quieroConFlorCalled = () => {
    if (socket) socket.emit('quieroConFlorCalled', {
      gameId: game.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const esMejorCalled = () => {
    if (socket) socket.emit('esMejorCalled', {
      gameId: game.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const handleTengo = (tengoNumber: number) => {
    if (socket) socket.emit('tengoCalled', {
      gameId: game.gameId,
      userId: id,
      number: tengoNumber
    })
    else (alert("no socket"))
  }

  const tengoFlor = () => {
    if (socket) socket.emit('tengoFlorCalled', {
      gameId: game.gameId,
      userId: id,
    })
    else (alert("no socket"))
  }

  const tengoFlorTambienCalled = () => {
    if (socket) socket.emit('tengoFlorTambienCalled', {
      gameId: game.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{width: "90%"}}>
          <div style={{paddingTop: "35px"}}>
            {!isSpectator && <Typography variant="h5" align="center">Opponent's Cards{isHost ? !game.hostHasDeck && " (has deck)" : game.hostHasDeck && " (has deck)"}</Typography>}
            <Cards 
              socket={socket}
              other={true}
              game={game}
              isHost={isHost}
            />
          </div>
          <div>
            <CardsPlayed game={game} id={socket?.id}/> 
          </div>
          <div>
            {!isSpectator && <Typography variant="h5" align="center">Your Cards{isHost ? game.hostHasDeck && " (you have deck)" : !game.hostHasDeck && " (you have deck)"}</Typography>}
            <Cards
              socket={socket}
              other={false || isSpectator}
              game={game}
              isHost={isHost}
            />
          </div>
        </div>
        {!isSpectator && <div style={{width: "10%"}}>
          <Typography variant="h5">Buttons</Typography>
          <div>
            {(game.canCallTruco && game.tempCanCallTruco) && <Button onClick={trucoCalled}>"Truco!"</Button>}
            {(game.canCallEnvido && game.tempCanCallEnvido) && <Button onClick={envidoCalled}>"Envido!"</Button>}
          </div>
          {(isHost ? game.hostCanTrucoRespond : game.otherCanTrucoRespond) && <Typography variant="h5">Truco Responses</Typography>}
          <div>
            {(isHost ? game.hostCanTrucoRespond : game.otherCanTrucoRespond) && <Button onClick={trucoQuieroCalled}>"Quiero!"</Button>}
            {(isHost ? game.hostCanTrucoRespond : game.otherCanTrucoRespond) && <Button onClick={trucoNoQuieroCalled}>"No Quiero!"</Button>}
            {(isHost ? game.hostCanTrucoRespond || game.hostCanRetrucoAfterQuiero : game.otherCanTrucoRespond || game.otherCanRetrucoAfterQuiero) && <Button onClick={retrucoCalled}>"Retruco!"</Button>}
          </div>
          {(isHost ? game.hostCanEnvidoRespond1 : game.otherCanEnvidoRespond1) && <Typography variant="h5">Envido Responses 1</Typography>}
          <div>
            {(isHost ? game.hostCanEnvidoRespond1 && !game.hostHasFlor : game.otherCanEnvidoRespond1 && !game.otherHasFlor) && <Button onClick={quieroConClick}>"Quiero Con..."</Button>}
            <Dialog open={quieroConOpen} onClose={closeQuieroConCancel}>
              <DialogTitle>Quiero Con...</DialogTitle>
              <DialogContent>
                <DialogContentText>Enter a Value:</DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setQuieroConNumber(parseInt(e.target.value))}
                  />
              </DialogContent>
              <DialogActions>
                  <Button onClick={closeQuieroConCancel}>Cancel</Button>
                  <Button onClick={closeQuieroConSuccess}>Send</Button>
                </DialogActions>
            </Dialog>
            {(isHost ? game.hostCanEnvidoRespond1 : game.otherCanEnvidoRespond1) && <Button onClick={envidoNoQuieroCalled}>"No Quiero!"</Button>}
            {(isHost ? game.hostCanEnvidoRespond1 && game.hostHasFlor : game.otherCanEnvidoRespond1 && game.otherHasFlor) && <Button onClick={quieroConFlorCalled}>"Quiero Con Flor!"</Button>}
          </div>
          {(isHost ? game.hostCanEnvidoRespond2 : game.otherCanEnvidoRespond2) && <Typography variant="h5">Envido Responses 2</Typography>}
          <div>
            {(isHost ? game.hostCanEnvidoRespond2 : game.otherCanEnvidoRespond2) && <Button onClick={esMejorCalled}>"Es Mejor!"</Button>}
            {(isHost ? game.hostCanEnvidoRespond2 && !game.hostHasFlor : game.otherCanEnvidoRespond2 && !game.otherHasFlor) && <Button onClick={tengoClick}>"Tengo..."</Button>}
            <Dialog open={tengoOpen} onClose={closeTengoCancel}>
              <DialogTitle>Tengo...</DialogTitle>
              <DialogContent>
                <DialogContentText>Enter a Value:</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setTengoNumber(parseInt(e.target.value))}
                  />
              </DialogContent>
              <DialogActions>
                  <Button onClick={closeTengoCancel}>Cancel</Button>
                  <Button onClick={closeTengoSuccess}>Send</Button>
                </DialogActions>
            </Dialog>
            {(isHost ? game.hostCanEnvidoRespond2 && game.hostHasFlor : game.otherCanEnvidoRespond2 && game.otherHasFlor) && <Button onClick={tengoFlor}>"Tengo Flor!"</Button>}
            {(isHost ? game.hostCanEnvidoRespond2 && game.hostHasFlor : game.otherCanEnvidoRespond2 && game.otherHasFlor) && <Button onClick={tengoFlorTambienCalled}>"Tengo Flor Tambien!"</Button>}
          </div>
        </div>}
    </div>
  )
}

export default Board