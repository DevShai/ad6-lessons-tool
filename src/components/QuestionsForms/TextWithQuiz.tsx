import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { MultipleSelectionQuestion, QuestionDataReadText } from 'src/datatypes/datatypes';
import 'src/styles/MainPage.css'
import MultipleSelectionQuestionForm from './MultipleSelectionQuestion';

export default function QuestionFormTextWithQuiz(props) {

    const [questionData, setQuestionData] = useState(new QuestionDataReadText())

    useEffect(() => {
        if (props.questionData) {
            setQuestionData(props.questionData)
        }
    }, [props.questionData])

    const addQuizQuestion = function () {
        var newQuestionData = { ...questionData }
        newQuestionData.quiz.push(new MultipleSelectionQuestion())
        setQuestionData(newQuestionData)
    }

    const updateQuizQuestion = function (idx: number, newData: MultipleSelectionQuestion) {
        var newQuestionData = { ...questionData }
        newQuestionData.quiz[idx] = newData
        setQuestionData(newQuestionData)
    }

    return (
        <Container fluid>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    כותרת הטקסט
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type='text'
                        value={questionData.text_title.text}
                        onChange={(e) => setQuestionData({ ...questionData, text_title: { text: e.target.value, audio: undefined } })} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    טקסט
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        as='textarea'
                        value={questionData.text.text}
                        onChange={(e) => setQuestionData({ ...questionData, text: { text: e.target.value, audio: undefined } })} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    שאלות
                </Form.Label>
                <Col sm={10}>
                    <Button onClick={() => addQuizQuestion()}>+</Button>
                    {questionData.quiz.map((_val, idx) =>
                        <MultipleSelectionQuestionForm
                            key={idx}
                            idx={idx}
                            data={questionData.quiz[idx]}
                            updateQuizQuestion={updateQuizQuestion} />)}
                </Col>
            </Form.Group>
        </Container>
    );
}