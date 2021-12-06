import React from 'react'
import { Typography } from '@mui/material'

type Props = {
  hostPoints: number | undefined
  otherPoints: number | undefined
  handTrucoPoints: number | undefined
  handEnvidoPoints: number | undefined
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