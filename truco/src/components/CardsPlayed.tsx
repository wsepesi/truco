import { Box, Card, CardMedia } from '@mui/material'
import { CardIds, Game } from '../configs/types'

import React from 'react'

type Props = {
  game: Game,
  id: string | undefined
}

export const HOST_TOKEN_VALUE = 0;
export const OTHER_TOKEN_VALUE = 1;

const CardsPlayed = (props: Props) :React.ReactElement => {
  const isHost = props.id ? props.game.hostId === props.id : false;
  const { trick1Cards, trick2Cards, trick3Cards } = props.game;
  // if (isHost) {
  //   trick1Cards.reverse();
  //   trick2Cards.reverse();
  //   trick3Cards.reverse();
  // }
  return (
    <div>
      <Box sx={{padding: "30px 0px 30px 0px", height: "330px"}}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 35px 5px 35px"}}>
          <div style={{ display: "flex", flexDirection: isHost ? "column-reverse" : "column", alignItems: "center"}}>
            {trick1Cards.map((card) => {
              return (
                <Card key={card.id} sx={{ width: 120 }}>
                  <CardMedia
                      component="img"
                      // TODO: FIX LINK
                      image="./images/testcard.jpg"
                      alt={CardIds[card.id]}
                      height="160px"
                  />
                </Card>
              )
            })}
          </div>
          <div style={{ display: "flex", flexDirection: isHost ? "column-reverse" : "column", alignItems: "center"}}>
            {trick2Cards.map((card) => {
                return (
                  <Card key={card.id} sx={{ width: 120 }}>
                    <CardMedia
                        component="img"
                        // TODO: FIX LINK
                        image="./images/testcard.jpg"
                        alt={CardIds[card.id]}
                        height="160px"
                    />
                  </Card>
                )
              })}
          </div>
          <div style={{ display: "flex", flexDirection: isHost ? "column-reverse" : "column", alignItems: "center"}}>
            {trick3Cards.map((card) => {
                return (
                  <Card key={card.id} sx={{ width: 120 }}>
                    <CardMedia
                        component="img"
                        // TODO: FIX LINK
                        image="./images/testcard.jpg"
                        alt={CardIds[card.id]}
                        height="160px"
                    />
                  </Card>
                )
              })}
          </div>
          {/* <Card sx={{ width: 120 }}>
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
          </Card> */}
        </div>
      </Box>
    </div>
  )
}

export default CardsPlayed