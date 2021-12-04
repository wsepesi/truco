import { Box, Card, CardMedia } from '@mui/material'
import React from 'react'

const CardsPlayed = () :React.ReactElement => {
  return (
    <div>
      <Box sx={{padding: "30px 0px 30px 0px", height: "330px"}}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 35px 5px 35px"}}>
          <Card sx={{ width: 120 }}>
            <CardMedia
                component="img"
                // TODO: FIX LINK
                image="./images/testcard.jpg"
                alt="test image"
                height="160px"
            />
          </Card>
          <Card sx={{ width: 120 }}>
            <CardMedia
                component="img"
                // TODO: FIX LINK
                image="./images/testcard.jpg"
                alt="test image"
                height="160px"
            />
          </Card>
          <Card sx={{ width: 120 }}>
            <CardMedia
                component="img"
                // TODO: FIX LINK
                image="./images/testcard.jpg"
                alt="test image"
                height="160px"
            />
          </Card>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 35px 0px 35px"}}>
          <Card sx={{ width: 120 }}>
            <CardMedia
                component="img"
                // TODO: FIX LINK
                image="./images/testcard.jpg"
                alt="test image"
                height="160px"
            />
          </Card>
          <Card sx={{ width: 120 }}>
            <CardMedia
                component="img"
                // TODO: FIX LINK
                image="./images/testcard.jpg"
                alt="test image"
                height="160px"
            />
          </Card>
          <Card sx={{ width: 120 }}>
            <CardMedia
                component="img"
                // TODO: FIX LINK
                image="./images/testcard.jpg"
                alt="test image"
                height="160px"
            />
          </Card>
        </div>
      </Box>
    </div>
  )
}

export default CardsPlayed