import { Button, Typography } from '@mui/material'
import React from 'react'
import CardsPlayed from './CardsPlayed'

type Props = {
  trucoCalled: boolean
  setTrucoCalled: any //FIXME:
  envidoCalled: boolean
  setEnvidoCalled: any //FIXME:
}

const Board = (props: Props) :React.ReactElement => {
  //TODO: A LOT MORE NEEDS TO GO IN THESE FUNCTIONS
  const handleTruco = () => {
    props.setTrucoCalled(true)
  }

  const handleEnvido = () => {
    props.setEnvidoCalled(true)
  }

  const handleTrucoNoQuiero = () => {
    props.setTrucoCalled(false)
  }

  const handleTrucoQuiero = () => {
    props.setTrucoCalled(false)
  }

  const handleRetruco = () => {
  }

  const handleEnvidoNoQuiero = () => {
    props.setEnvidoCalled(false)
  }

  const handleQuieroCon = () => {
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{width: "90%"}}>
          <div style={{paddingTop: "35px"}}>
            Other Cards
          </div>
          <div>
            <CardsPlayed />
          </div>
          <div>
            User's Cards
          </div>
        </div>
        <div style={{width: "10%"}}>
          <Typography variant="h5">Calls</Typography>
          {!props.trucoCalled && !props.envidoCalled && (
            <div>
              <Button onClick={handleTruco}>"Truco!"</Button>
              <Button onClick={handleEnvido}>"Envido!"</Button>
            </div>
          )}
          <Typography variant="h5">Responses</Typography>
          {props.trucoCalled && (
            <div>
              <Button onClick={handleTrucoNoQuiero}>"No Quiero!"</Button>
              <Button onClick={handleTrucoQuiero}>"Quiero!"</Button>
              <Button onClick={handleRetruco}>"Retruco!</Button>
            </div>
          )}
          {props.envidoCalled && (
            <div>
              <Button onClick={handleEnvidoNoQuiero}>"No Quiero!"</Button>
              <Button onClick={handleQuieroCon}>"Quiero con ...!"</Button>
              {/* TODO: MAKE FLOR A STATE IN GAMEHOME IF THE USER HAS FLOR */}
            </div>
          )}
        </div>
    </div>
  )
}

export default Board