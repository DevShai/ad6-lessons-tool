import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function InputTextWithAudio(props) {

    return (
        <InputGroup>
            <InputGroup.Text>{props.text}</InputGroup.Text>
            <Form.Control type='text'></Form.Control>
<br/>
            <InputGroup.Text>אודיו</InputGroup.Text>
            <Form.Control type='file'></Form.Control>
        </InputGroup>
        
    );
}