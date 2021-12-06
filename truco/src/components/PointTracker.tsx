import { Typography } from '@mui/material'
import React from 'react'

type Props = {
  hostPoints: number
  otherPoints: number
  handTrucoPoints: number
  handEnvidoPoints: number
}

const PointTracker = (props:Props) :React.ReactElement => {
  return (
    <div>
        <Typography variant="h4">Overall Points:</Typography>
        {/* TODO: ADD IN PROP WITH USERNAMES */}
        <p>User 1: {props.hostPoints}</p>
        <p>User 2: {props.otherPoints}</p>
        <Typography variant="h5">This Hand:</Typography>
        <p>Truco Points: {props.handTrucoPoints}</p>
        <p>Envido Points: {props.handEnvidoPoints}</p>
    </div>
  )
}

export default PointTracker