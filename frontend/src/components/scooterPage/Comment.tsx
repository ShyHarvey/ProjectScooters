import React from 'react'
import { Container, Avatar, Rating } from '@mui/material/'
import { Stack } from '@mui/system'
import Typography from '@mui/material/Typography'
import { Person } from '../../redux/scootersCatalogReducer'

type CommentProps = {
    person: Person
    text: string,
    mark: number,

}

export const Comment: React.FC<CommentProps> = ({ person, text, mark }) => {
    return (
        <Container sx={{ mt: 2 }}>
            <Stack direction='row' alignItems='center'>
                {/* {avatar ? <Avatar alt={name} src={avatar} sx={{ width: 56, height: 56 }} /> : */}
                <Avatar sx={{ width: 56, height: 56 }}>{person.name[0]}</Avatar>
                <Stack sx={{ ml: 1 }} direction='column'>
                    <Typography variant='body1' component='p'>{person.name}</Typography>
                    <Rating value={+mark} precision={0.5} readOnly />
                </Stack>
            </Stack>
            <Typography variant='body1' component='p'>{text}</Typography>
        </Container>
    )
}