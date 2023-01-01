import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../styles/MainPage.css'
import { Lesson, VOWEL } from '../datatypes/datatypes'
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
                    ערבוב שאלות
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

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    שאלות
                </Form.Label>
                <Col sm={10} className="switch-container">
                   <QuestionsNav elements={lessonData.questions}/>
                </Col>
            </Form.Group>

            <center>
                <Button type='submit'>שמירה</Button>
            </center>
        </Form>
    );
}