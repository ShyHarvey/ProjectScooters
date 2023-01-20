import React from 'react'
import { Container, Avatar, Rating } from '@mui/material/'
import { Stack } from '@mui/system'
import Typography from '@mui/material/Typography'

type CommentProps = {
    name: string,
    avatar: string | undefined,
    body: string,
    rating: string,

}

export const Comment: React.FC<CommentProps> = ({ name, avatar, body, rating }) => {
    return (
        <Container sx={{ mt: 2 }}>
            <Stack direction='row' alignItems='center'>
                {avatar ? <Avatar alt={name} src={avatar} sx={{ width: 56, height: 56 }} /> :
                    <Avatar sx={{ width: 56, height: 56 }}>A</Avatar>}
                <Stack sx={{ ml: 1 }} direction='column'>
                    <Typography variant='body1' component='p'>{name}</Typography>
                    <Rating value={+rating} precision={0.5} readOnly />
                </Stack>
            </Stack>
            <Typography variant='body1' component='p'>{body}</Typography>
        </Container>
    )
}