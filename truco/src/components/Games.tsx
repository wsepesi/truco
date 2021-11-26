import { Box, Grid } from '@mui/material'
import React from 'react'
import Game from './Game'

const Games = () :React.ReactElement => {
  return (
    <div>
      <Grid>
          <Box>
            {/* TODO: CHECK IN THE DATABASE FOR ALL THE GAMES THEN MAP OVER THAT ARRAY */}
            <Game
              gameOwner="test" //FIXME:
              gameId={0} //FIXME:
            />
          </Box>
      </Grid>
    </div>
  )
}

export default Games