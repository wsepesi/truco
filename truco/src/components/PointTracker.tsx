import React from 'react'
import { Typography } from '@mui/material'

type Props = {
  hostPoints: number | undefined
  otherPoints: number | undefined
  handTrucoPoints: number | undefined
  handEnvidoPoints: number | undefined
}

const PointTracker = (props:Props) :React.ReactElement => {
  const { hostPoints, otherPoints, handTrucoPoints, handEnvidoPoints } = props
  const forfeited = hostPoints === -1 || otherPoints === -1
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
    </div>
  )
}

export default PointTracker