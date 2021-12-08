import { Button, Card, Typography } from '@mui/material';

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
            flexDirection: 'row',
            justifyContent: 'center',
            height: 250,
            width: 100 
        }}>
            <Typography variant="h3">Leaderboard</Typography>
            <div>
                {topTen.map((user, index) => (
                    <Card key={index} sx={{ height: '20px' }} variant="outlined">
                        <Typography variant="h5">{user.name}: {user.wins} wins</Typography>
                    </Card>
                ))}
            </div>
            <Button onClick={props.refetch}>Refresh</Button>
        </Card>
    )
}

export default Leaderboard;