import React from 'react'
import { Typography } from '@mui/material'
import { TrucoCard } from '../configs/types'
import { HOST_TOKEN_VALUE, OTHER_TOKEN_VALUE } from './CardsPlayed'

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
        <Typography>{cardsPlayedInHand === 2 ? trick1Winner : ''}</Typography>
        <Typography>{cardsPlayedInHand === 4 ? trick2Winner : ''}</Typography>
    </div>
  )
}

export default PointTracker