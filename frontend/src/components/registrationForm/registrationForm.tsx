import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import './registrationForm.scss'
import { useAppDispatch } from '../../redux/hooks';
import Countries from './countries';
import { fetchRegistration } from '../../redux/authReducer';
import { useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';

import { RegistrationData } from '../../http/axios';

type RegistrationFormData = RegistrationData;

function RegistrationForm() {
    const isAuth = useAppSelector(state=> state.auth.isAuth)
    const dispatch = useAppDispatch()
    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
    } = useForm<RegistrationFormData>({ mode: "onBlur" });

    const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
        console.log(data)
        data.yearOfBirth = 2015;
        dispatch(fetchRegistration(data))
    }
    if(isAuth){
        return <Navigate to='/'/>
     } 

    return (
        <Container>
            <h2>Registration</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" {...register('name', { required: true })} />
                    <Form.Text className="text-muted">
                        {errors?.name && "Обязательное поле"}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" placeholder="surname" {...register('surname', { required: true })} />
                    <Form.Text className="text-muted">
                        {errors?.surname && "Обязательное поле"}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className='me-3'>Date of birth</Form.Label>
                    <input className='form-control' type="date"  {...register("yearOfBirth")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register('email', { required: true })} />
                    <Form.Text className="text-muted">
                        {errors?.email && "Обязательное поле"}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Select aria-label="Default select example" {...register("country")}>
                        <Countries />
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" {...register('username', { required: true })} />
                    <Form.Text className="text-muted">
                        {errors?.name && "Обязательное поле"}
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

export default RegistrationForm;