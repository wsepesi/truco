import { HOST_TOKEN_VALUE, OTHER_TOKEN_VALUE } from './CardsPlayed'

import React from 'react'
import { TrucoCard } from '../configs/types'
import { Typography } from '@mui/material'

type Props = {
  hostPoints: number | undefined
  otherPoints: number | undefined
  handTrucoPoints: number | undefined
  handEnvidoPoints: number | undefined
  trick1Cards: TrucoCard[] | undefined
  trick2Cards: TrucoCard[] | undefined
  cardsPlayedInHand: number | undefined
}

const PointTracker = (props:Props) :React.ReactElement => {
  const { hostPoints, otherPoints, handTrucoPoints, handEnvidoPoints, trick1Cards, trick2Cards, cardsPlayedInHand } = props
  const forfeited = hostPoints === -1 || otherPoints === -1

  const two: boolean = cardsPlayedInHand && (cardsPlayedInHand >= 2) ? true : false;
  const four: boolean = cardsPlayedInHand && (cardsPlayedInHand >= 4) ? true : false;


  let trick1Winner = '';
  let trick2Winner = '';
  if (trick1Cards && cardsPlayedInHand && cardsPlayedInHand > 1) trick1Winner = trick1Cards[HOST_TOKEN_VALUE].order < trick1Cards[OTHER_TOKEN_VALUE].order ? "Host" : (trick1Cards[HOST_TOKEN_VALUE].order === trick1Cards[OTHER_TOKEN_VALUE].order ? "Tie" : "Guest");
  if (trick2Cards && cardsPlayedInHand && cardsPlayedInHand > 3) trick2Winner = trick2Cards[HOST_TOKEN_VALUE].order < trick2Cards[OTHER_TOKEN_VALUE].order ? "Host" : (trick2Cards[HOST_TOKEN_VALUE].order === trick2Cards[OTHER_TOKEN_VALUE].order ? "Tie" : "Guest");
  return (
    <div>
        {!forfeited && (
          <div>
            <Typography variant="h4">Overall Points:</Typography>
            <Typography>Host: {hostPoints}</Typography>
            <Typography>Guest: {otherPoints}</Typography>
          </div>
        )}
        <Typography variant="h5">This Hand:</Typography>
        <Typography>Truco Points: {handTrucoPoints}</Typography>
        <Typography>Envido Points: {handEnvidoPoints}</Typography>
        {two && <Typography>Trick 1 winner: {trick1Winner}</Typography>}
        {four && <Typography>Trick 2 winner: {trick2Winner}</Typography>}
    </div>
  )
}

export default PointTracker