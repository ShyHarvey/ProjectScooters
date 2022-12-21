import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import './loginForm.scss'
import { useAppDispatch } from '../../redux/hooks';
import { fetchLogin } from '../../redux/authReducer';
import { LoginData } from '../../http/axios';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';


function LoginForm() {

    const isAuth = useAppSelector(state=> state.auth.isAuth)

const dispatch = useAppDispatch()
    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
    } = useForm<LoginData>({ mode: "onBlur" });

    const onSubmit:SubmitHandler<LoginData> = (data) => {
        console.log(data)
        dispatch(fetchLogin(data))
    }

    if(isAuth){
       return <Navigate to='/'/>
    } 
    return (
        <Container className='loginFormContainer'>
            <h2>Log in</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" {...register('email', { required: true })} />
                    <Form.Text className="text-muted">
                        {errors?.email && "Обязательное поле"}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register('password', { required: true })} />
                    <Form.Text className="text-muted">
                        {errors?.password && "Обязательное поле"}
                    </Form.Text>
                </Form.Group>
                <Button disabled={!isValid} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default LoginForm;