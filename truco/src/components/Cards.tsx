import { Card, CardActionArea, CardMedia } from '@mui/material'
import { CardIds, TrucoCard } from '../configs/types'

import React from 'react'
// import testCard from '../images/testcard.jpg'
import { Socket } from 'socket.io-client'
import { useParams } from 'react-router'

type Props = {
    cards: TrucoCard[]
    other: boolean
    socket: Socket | null
    // FIXME: THE THING FROM MUI IS CALLED CARD, SO WE CANT IMPORT OUR DATA TYPE CALLED CARD
}

const Cards = (props: Props) :React.ReactElement => {
    const { id } = useParams();
    const { socket } = props;
    if (!socket) throw new Error('Socket is null');
    const playCard = (cardId: number) => {
        socket.emit('playCard', {
            gameId: id,
            playerId: socket.id,
            cardId

        })
        //FIXME:
    }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 20px 0px 20px"}}>
        {props.cards.map((card: TrucoCard) => {
            return (
                <Card key={card.id} sx={{ width: 150 }}>
                    <CardActionArea disabled={props.other} onClick={() => playCard(card.id)}>
                        <CardMedia
                            component="img"
                            image={props.other ? 'back' : 'ahhh'} //TODO: replace w real card image
                            alt={props.other ? 'back' : CardIds[card.id]}
                            height="200"
                        />
                    </CardActionArea>
                </Card>
            )
        })}
        {/* <Card sx={{ width: 150 }}>
            <CardActionArea onClick={playCard}>
                <CardMedia
                    component="img"
                    // TODO: FIX LINK
                    image={testCard}
                    alt="test image"
                    height="200"
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
        </Card> */}
    </div>
  )
}

export default Cards