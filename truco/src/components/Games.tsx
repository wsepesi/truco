import { Box, Grid } from '@mui/material'
import React from 'react'

const Games = () :React.ReactElement => {
  return (
    <div>
        <Grid container spacing ={1} item xs={4}>
            <Box>
                Game Text Here
            </Box>
        </Grid>
    </div>
  )
}

export default Games