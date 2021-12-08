import { Button, Card, Typography } from '@mui/material';

import { Box } from '@mui/system';
import React from 'react';
import { User } from '../configs/types';

type Props = {
    users: User[],
    refetch: () => void
}

const Leaderboard = (props: Props): React.ReactElement => {
    const topTen = props.users.sort((a, b) => b.wins - a.wins).slice(0, 10);
    return(
        <Card elevation={5} sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '80vw'
            // height: 250,
            // width: 1000 
        }}>
            <Typography variant="h3">Leaderboard</Typography>
            <Box sx={{ justifyContent: 'center'}}>
                {topTen.map((user, index) => (
                    <Card key={index} sx={{ height: '30px', maxWidth: '100px' }} variant="outlined">
                        <Typography variant="h5">{user.name}: {user.wins} wins</Typography>
                    </Card>
                ))}
            </Box>
            <Button onClick={props.refetch}>Refresh</Button>
        </Card>
    )
}

export default Leaderboard;