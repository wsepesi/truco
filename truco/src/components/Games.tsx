import { Box, Grid } from '@mui/material'
import React from 'react'
import Game from './Game'

const Games = () :React.ReactElement => {
  return (
    <div>
      <Grid>
          <Box>
            <Game/>
          </Box>
      </Grid>
    </div>
  )
}

export default Games