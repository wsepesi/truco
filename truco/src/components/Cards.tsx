import { Card, CardActionArea, CardMedia } from '@mui/material'
import React from 'react'

const Cards = () :React.ReactElement => {
    const playCard = () => {
        //FIXME:
    }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 20px 0px 20px"}}>
        <Card sx={{ width: 150 }}>
            <CardActionArea onClick={playCard}>
                <CardMedia
                    component="img"
                    // TODO: FIX LINK
                    image="./images/testcard.jpg"
                    alt="test image"
                    height="200px"
                />
            </CardActionArea>
        </Card>
        <Card sx={{ width: 150 }}>
            <CardActionArea onClick={playCard}>
                <CardMedia
                    component="img"
                    // TODO: FIX LINK
                    image="./images/testcard.jpg"
                    alt="test image"
                    height="200px"
                />
            </CardActionArea>
        </Card>
        <Card sx={{ width: 150 }}>
            <CardActionArea onClick={playCard}>
                <CardMedia
                    component="img"
                    // TODO: FIX LINK
                    image="./images/testcard.jpg"
                    alt="test image"
                    height="200px"
                />
            </CardActionArea>
        </Card>
    </div>
  )
}

export default Cards