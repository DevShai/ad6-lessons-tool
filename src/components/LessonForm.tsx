import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import '../styles/MainPage.css'
import { CreateQuestion, Lesson, Question, QUESTION_TYPES, VOWEL } from '../datatypes/datatypes'
import QuestionsNav from './QuestionsNav';

export default function LessonForm(props) {

    const [lessonData, setLessonData] = useState(new Lesson())

    useEffect(() => {
        if (props.lessonData) {
            setLessonData(props.lessonData)
        }
    }, [props.lessonData])

    const onSubmit = function () {
        props.onSubmit(lessonData)
    }

    const addNewQuestion = function (type: QUESTION_TYPES) {
        var newData = { ...lessonData }
        var newQuestion = CreateQuestion(type)
        newData.questions.push(newQuestion)
        setLessonData(newData)
    }
    const updateQuestion = function (idx: number, data: Question) {
        var newData = { ...lessonData }
        newData.questions[idx] = data
        setLessonData(newData)
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    שם השיעור
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        required
                        type="text"
                        placeholder=""
                        value={lessonData.lesson_name}
                        onChange={(e) => setLessonData({ ...lessonData, lesson_name: e.target.value })} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    צליל השיעור
                </Form.Label>
                <Col sm={10}>
                    <Form.Select
                        onChange={(e) => setLessonData({ ...lessonData, vowel: e.target.value as VOWEL })}
                        value={lessonData.vowel}>
                        <option value="mixed">מעורב</option>
                        <option value="a">קמץ, פתח</option>
                        <option value="e">חיריק</option>
                        <option value="i">חולם</option>
                        <option value="o">קובוץ, שורוק</option>
                        <option value="u">סגול, צירה</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    אותיות
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        placeholder=""
                        onChange={(e) => setLessonData({ ...lessonData, lesson_letters: [e.target.value] })}
                        value={lessonData.lesson_letters} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    מבחן
                </Form.Label>
                <Col sm={10} className="switch-container">
                    <Form.Check
                        type="switch"
                        id="is_test"
                        checked={lessonData.is_exam}
                        onChange={(e) => setLessonData({ ...lessonData, is_exam: e.target.checked })}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    תרגילים בסדר רנדומלי
                </Form.Label>
                <Col sm={10} className="switch-container">
                    <Form.Check
                        type="switch"
                        id="is_shuffle"
                        checked={lessonData.shuffle_questions}
                        onChange={(e) => setLessonData({ ...lessonData, shuffle_questions: e.target.checked })}
                    />
                </Col>
            </Form.Group>
            <br/>
            {props.showQuestions ?
                <Container fluid>
                    <Row className="mb-3">
                        <Form.Label column sm={2}>
                            
                        </Form.Label>
                        <Row>
                            <Col>
                                <QuestionsNav
                                    elements={lessonData.questions}
                                    addNewQuestion={addNewQuestion}
                                    updateQuestion={updateQuestion} />
                            </Col>
                        </Row>
                    </Row>
                </Container>
                : ""}

            <center>
                <Button type='submit'>שמירה</Button>
            </center>
        </Form>
    );
}