import { Link } from 'react-router-dom';
import React from 'react'

type Props = {
  currentUser: String
}

const Host = (props:Props) :React.ReactElement => {
  return (
    <div>
        <Link to="/gameHome">Host a Game</Link>
        {/* TODO: PASS CURRENT USER AS GAME OWNER */}
    </div>
  )
}

export default Host