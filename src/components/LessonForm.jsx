import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../styles/NewLessonDialog.css'



export default function LessonForm(props) {

    const [lessonData, setLessonData] = useState({
        lesson_name: '',
        vowel: 'mixed',
        lesson_letters: [],
        is_exam: false,
        shuffle_questions: false,
    })

    useEffect(() => {
        if (props.lessonData) {
            setLessonData(props.lessonData)
        }
    }, [props.lessonData])

    const onSubmit = function() {
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
                        onChange={(e) => setLessonData({ ...lessonData, lesson_name: e.target.value })} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    צליל השיעור
                </Form.Label>
                <Col sm={10}>
                    <Form.Select onChange={(e) => setLessonData({ ...lessonData, vowel: e.target.value })}>
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
                    <Form.Control type="text" placeholder="" />
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
                        onChange={(e) => setLessonData({ ...lessonData, shuffle_questions: e.target.checked })}
                    />
                </Col>
            </Form.Group>
            <center>
                <Button type='submit'>שמירה</Button>
            </center>
        </Form>
    );
}