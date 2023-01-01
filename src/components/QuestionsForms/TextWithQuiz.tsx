import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { QuestionDataReadText } from 'src/datatypes/datatypes';
import 'src/styles/MainPage.css'

export default function QuestionFormTextWithQuiz(props) {

    const [questionData, setQuestionData] = useState(new QuestionDataReadText())

    useEffect(() => {
        if (props.questionData) {
            setQuestionData(props.questionData)
        }
    }, [props.questionData])

    const onSubmit = function () {
        props.onSubmit(questionData)
    }

    return (
        <Form onSubmit={onSubmit}>

            <InputGroup>
                <InputGroup.Text>כותרת הטקסט</InputGroup.Text>
                <Form.Control type='text' />
            </InputGroup>

            <InputGroup>
                <InputGroup.Text>טקסט</InputGroup.Text>
                <Form.Control as="textarea" />
            </InputGroup>

            <center>
                <Button type='submit'>שמירה</Button>
            </center>
        </Form>
    );
}