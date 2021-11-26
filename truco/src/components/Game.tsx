import { Button } from '@mui/material'
import React from 'react'

type Props = {
  gameOwner: String
  gameId: number
}

const Game = (props:Props) :React.ReactElement => {
  const joinGame = () => {
    // TODO: PUT SOMETHING WITH GAME ID HERE
  }

  return (
    <div>
        Game Owner: {props.gameOwner}
        <Button onClick={joinGame}>Join Game</Button>
    </div>
  )
}

export default Game