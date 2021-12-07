import { Card, CardActionArea, CardMedia } from '@mui/material'
import { CardIds, Game, TrucoCard } from '../configs/types'

import React from 'react'
// import testCard from '../images/testcard.jpg'
import { Socket } from 'socket.io-client'
import { useParams } from 'react-router'

type Props = {
    // cards: TrucoCard[]
    game: Game
    other: boolean
    socket: Socket | null
    isHost: boolean
}

const Cards = (props: Props) :React.ReactElement => {
    const { id } = useParams();
    const { socket, game, other, isHost } = props;
    const cards = (isHost === other) ? game.otherCards : game.hostCards;
    const yourTurn = !isHost ? !game.hostTurn : game.hostTurn;
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
        {cards.map((card: TrucoCard) => {
            return (
                <Card key={card.id} sx={{ width: 150 }}>
                    <CardActionArea disabled={other || !game.canPlayCards || !yourTurn} onClick={() => playCard(card.id)}>
                        <CardMedia
                            component="img"
                            image={other ? '/back.png' : `/TrucoCards/${card.suit}${card.number}.jpg`}
                            alt={other ? 'back' : CardIds[card.id]}
                            height="200"
                        />
                    </CardActionArea>
                </Card>
            )
        })}
    </div>
  )
}

export default Cards