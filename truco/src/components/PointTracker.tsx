import { Typography } from '@mui/material'
import React from 'react'

type Props = {
  trucoPoints: number
  setTrucoPoints: any //FIXME:
  envidoPoints: number
  setEnvidoPoints: any //FIXME:
  ownerPoints: number
  setOwnerPoints: any //FIXME:
  otherPoints: number
  setOtherPoints: any //FIXME:
}

const PointTracker = (props:Props) :React.ReactElement => {
  return (
    <div>
        <Typography variant="h4">Overall Points:</Typography>
        {/* TODO: ADD IN PROP WITH USERNAMES */}
        <p>User 1: {props.ownerPoints}</p>
        <p>User 2: {props.otherPoints}</p>
        <Typography variant="h5">This Hand:</Typography>
        <p>Truco Points: {props.trucoPoints}</p>
        <p>Envido Points: {props.envidoPoints}</p>
    </div>
  )
}

export default PointTracker