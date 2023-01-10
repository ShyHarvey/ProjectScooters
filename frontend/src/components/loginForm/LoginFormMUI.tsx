import React from 'react'
import { Navigate } from 'react-router-dom'
import { Container, TextField, Alert, Box, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch } from '../../redux/hooks';
import { useAppSelector } from '../../redux/hooks';
import { LoginData } from '../../http/axios';
import { fetchLogin } from '../../redux/authReducer';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z.object({
    email: z.string().email('Введите корректный email'),
    password: z.string().min(1, { message: "Обязательное поле" })
})

export const LoginFormMUI: React.FC<{}> = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    let axiosError = useAppSelector(state => state.auth.axiosError)
    let loading = useAppSelector(state => state.auth.loading)
    const dispatch = useAppDispatch()
    const {
        control,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<LoginData> = (data) => {
        dispatch(fetchLogin(data))
    }

    if (isAuth) {
        return <Navigate to='/' />
    }
    return (
        <Container maxWidth="sm">
            <Typography variant='h4'>Вход</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextField {...field}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email?.message : ''}
                        label="Email" variant='outlined'
                        fullWidth margin='dense' />}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextField {...field}
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password ? errors.password?.message : ''}
                        label="Password" variant='outlined'
                        fullWidth
                        margin='dense' />}
                />

                <LoadingButton loading={loading} type='submit' variant='contained' sx={{ mt: 2 }}>Login</LoadingButton>
                {axiosError && <Alert severity="error">Неверный логин или пароль</Alert>}
            </Box>
        </Container>
    )
}