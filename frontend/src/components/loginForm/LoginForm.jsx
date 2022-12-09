import React from 'react';
import { useForm } from "react-hook-form"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import './loginForm.scss'
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../redux/authReducer';


function LoginForm() {

const dispatch = useDispatch()
    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
    } = useForm({ mode: "onBlur" });

    const onSubmit = (data) => {
        console.log(data)
        dispatch(fetchLogin(data))
    }

    return (
        <Container className='loginFormContainer'>
            <h2>Log in</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" {...register('username', { required: true })} />
                    <Form.Text className="text-muted">
                        {errors?.username && "Обязательное поле"}
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