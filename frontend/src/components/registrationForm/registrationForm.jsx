import React from 'react';
import { useForm } from "react-hook-form"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import './registrationForm.scss'
// import { useDispatch } from 'react-redux';
import Countries from './countries';



function RegistrationForm() {

    // const dispatch = useDispatch()
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

    }

    return (
        <Container className='loginFormContainer'>
            <h2>Registration</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Username</Form.Label>
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
                    <input className='form-control' type="date"  {...register("date")} />
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