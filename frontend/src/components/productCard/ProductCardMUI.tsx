import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import scooterImage from '../../assets/scooter-2.webp'

export default function ProductCardMUI() {
    return (
        <Card sx={{ maxWidth: 245, padding: 1 }}>
            <CardMedia
                sx={{ height: 175 }}
                image={scooterImage}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6"  component="div" sx={{ fontWeight: 'bold' }}>
                    Kugoo Kirin M4
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <Typography >9999₽</Typography>
                </Typography>
            </CardContent>
        </Card>
    );
}