import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router'
import { Socket } from 'socket.io-client'
import { isPropertySignature } from 'typescript'
import { Card } from '../configs/types'
import Cards from './Cards'
import CardsPlayed from './CardsPlayed'

type Props = {
  socket: Socket | null;
  hostId: String;
  otherId: String;
  gameId: String;

  hostCards: Card[];
  otherCards: Card[];
  trick1Cards: Card[];
  trick2Cards: Card[];
  trick3Cards: Card[];

  hostHasDeck: boolean;
  hostTurn: boolean;
  canPlayCards: boolean;

  hostCalledEnvido: boolean;
  otherCalledEnvido: boolean;
  hostEnvidoCon: number;
  otherEnvidoCon: number;

  canCallTruco: boolean;
  canCallEnvido: boolean;
  tempCanCallTruco: boolean;
  tempCanCallEnvido: boolean;
  hostCanTrucoRespond: boolean;
  otherCanTrucoRespond: boolean;
  hostCanRetrucoAfterQuiero: boolean;
  otherCanRetrucoAfterQuiero: boolean;
  hostCanEnvidoRespond1: boolean;
  otherCanEnvidoRespond1: boolean;
  hostCanEnvidoRespond2: boolean;
  otherCanEnvidoRespond2: boolean;
}

const Board = (props: Props) :React.ReactElement => {
  const socket = props.socket;
  const { id } = useParams()

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
    if (id === props.hostId) {
      if (tengoNumber < props.otherEnvidoCon || (tengoNumber === props.otherEnvidoCon && !props.hostHasDeck) || tengoNumber > 33) {
        alert("Invalid Tengo Number");
        setTengoNumber(0);
        return;
      }
    }
    if (id === props.otherId) {
      if (tengoNumber < props.hostEnvidoCon || (tengoNumber === props.hostEnvidoCon && props.hostHasDeck) || tengoNumber > 33) {
        alert("Invalid Tengo Number");
        setTengoNumber(0);
        return;
      }
    }
    handleTengo(tengoNumber);
  }

  let opponentCards: Card[] = [];
  let yourCards: Card[] = [];
  if (id === props.hostId) {
    opponentCards = props.otherCards;
    yourCards = props.hostCards;
  }
  else {
    opponentCards = props.hostCards;
    yourCards = props.otherCards;
  }

  const trucoCalled = () => {
    if (socket) socket.emit('trucoCalled', {
      gameId: props.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const envidoCalled = () => {
    if (socket) socket.emit('envidoCalled', {
      gameId: props.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const trucoQuieroCalled = () => {
    if (socket) socket.emit('trucoQuieroCalled', {
      gameId: props.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const trucoNoQuieroCalled = () => {
    if (socket) socket.emit('trucoNoQuieroCalled', {
      gameId: props.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const retrucoCalled = () => {
    if (socket) socket.emit('retrucoCalled', {
      gameId: props.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const handleQuieroCon = (quieroConNumber: number) => {
    if (socket) socket.emit('quieroConCalled', {
      gameId: props.gameId,
      userId: id,
      number: quieroConNumber
    })
    else (alert("no socket"))
  }

  const envidoNoQuieroCalled = () => {
    if (socket) socket.emit('envidoNoQuieroCalled', {
      gameId: props.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const quieroConFlorCalled = () => {
    if (socket) socket.emit('quieroConFlorCalled', {
      gameId: props.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const esMejorCalled = () => {
    if (socket) socket.emit('esMejorCalled', {
      gameId: props.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  const handleTengo = (tengoNumber: number) => {
    if (socket) socket.emit('quieroConCalled', {
      gameId: props.gameId,
      userId: id,
      number: tengoNumber
    })
    else (alert("no socket"))
  }

  const tengoFlorTambienCalled = () => {
    if (socket) socket.emit('tengoFlorTambienCalled', {
      gameId: props.gameId,
      userId: id
    })
    else (alert("no socket"))
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{width: "90%"}}>
          <div style={{paddingTop: "35px"}}>
            <Typography variant="h5" align="center">Opponent's Cards</Typography>
            <Cards
              // cards={opponentCards}
            />
          </div>
          <div>
            <CardsPlayed />
          </div>
          <div>
            <Typography variant="h5" align="center">Your Cards</Typography>
            <Cards
              // cards={yourCards}
            />
          </div>
        </div>
        <div style={{width: "10%"}}>
          <Typography variant="h5">Calls</Typography>
          <div>
            <Button disabled={!(props.canCallTruco && props.tempCanCallTruco)} onClick={trucoCalled}>"Truco!"</Button>
            <Button disabled={!(props.canCallEnvido && props.tempCanCallEnvido)} onClick={envidoCalled}>"Envido!"</Button>
          </div>
          <Typography variant="h5">Truco Responses</Typography>
          <div>
            <Button disabled={!(id === props.hostId && props.hostCanTrucoRespond) || !(id === props.otherId && props.otherCanTrucoRespond)} onClick={trucoQuieroCalled}>"Quiero!"</Button>
            <Button disabled={!(id === props.hostId && props.hostCanTrucoRespond) || !(id === props.otherId && props.otherCanTrucoRespond)} onClick={trucoNoQuieroCalled}>"No Quiero!"</Button>
            <Button disabled={!(id === props.hostId && (props.hostCanTrucoRespond || props.hostCanRetrucoAfterQuiero)) || !(id === props.otherId && (props.otherCanTrucoRespond || props.otherCanRetrucoAfterQuiero))} onClick={retrucoCalled}>"Retruco!"</Button>
          </div>
          <Typography variant="h5">Envido Responses 1</Typography>
          <div>
            <Button disabled={!(id === props.hostId && props.hostCanEnvidoRespond1) || !(id === props.otherId && props.otherCanEnvidoRespond1)} onClick={quieroConClick}>"Quiero Con..."</Button>
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
                    // FIXME: DO SOMETHING INSTEAD OF PARSEINT
                  />
              </DialogContent>
              <DialogActions>
                  <Button onClick={closeQuieroConCancel}>Cancel</Button>
                  <Button onClick={closeQuieroConSuccess}>Send</Button>
                </DialogActions>
            </Dialog>
            <Button disabled={!(id === props.hostId && props.hostCanEnvidoRespond1) || !(id === props.otherId && props.otherCanEnvidoRespond1)} onClick={envidoNoQuieroCalled}>"No Quiero!"</Button>
            <Button disabled={!(id === props.hostId && props.hostCanEnvidoRespond1) || !(id === props.otherId && props.otherCanEnvidoRespond1)} onClick={quieroConFlorCalled}>"Quiero Con Flor!"</Button>
          </div>
          <Typography variant="h5">Envido Responses 2</Typography>
          <div>
            <Button disabled={!(id === props.hostId && props.hostCanEnvidoRespond2) || !(id === props.otherId && props.otherCanEnvidoRespond2)} onClick={esMejorCalled}>"Es Mejor!"</Button>
            <Button disabled={!(id === props.hostId && props.hostCanEnvidoRespond2) || !(id === props.otherId && props.otherCanEnvidoRespond2)} onClick={tengoClick}>"Tengo..."</Button>
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
                    // FIXME: DO SOMETHING INSTEAD OF PARSEINT
                  />
              </DialogContent>
              <DialogActions>
                  <Button onClick={closeTengoCancel}>Cancel</Button>
                  <Button onClick={closeTengoSuccess}>Send</Button>
                </DialogActions>
            </Dialog>
            <Button disabled={!(id === props.hostId && props.hostCanEnvidoRespond2) || !(id === props.otherId && props.otherCanEnvidoRespond2)} onClick={tengoFlorTambienCalled}>"Tengo Flor Tambien!"</Button>
          </div>
        </div>
    </div>
  )
}

export default Board