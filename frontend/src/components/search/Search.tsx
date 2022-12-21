import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';

export const Search: React.FC<{}> = () => {
    return (
        <InputGroup className='searchInput' >
            <Form.Control
                placeholder="Поиск"
                aria-label="Поиск"
                aria-describedby="Поиск"
            />
            <Button variant="outline-secondary" id="button-addon2">
                Искать
            </Button>
        </InputGroup>
    )
}