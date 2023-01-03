import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { QuestionDataReadVowel, VOWEL } from "src/datatypes/datatypes";

export default function QuestionFormVowelIntro(props) {

    const [questionData, setQuestionData] = useState(new QuestionDataReadVowel())
    const [isDefaultVowel, setIsDefaultVowel] = useState(true)

    useEffect(() => {
        if (props.questionData) {
            setQuestionData(props.questionData)
        }
    }, [props.idx])

    useEffect(() => {
        if (props.updateFunc) {
            props.updateFunc(props.idx, questionData)
        }
    }, [questionData])

    const isHebrew = function (text: string): boolean {
        return (/[\u0590-\u05FF]/).test(text)
    }

    return (
        <Container fluid>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    אות
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type='text'
                        onChange={(e) => setQuestionData({ ...questionData, letter: e.target.value })}
                        value={questionData.letter}
                        isValid={questionData.letter.length == 1}
                        isInvalid={questionData.letter.length != 1 || !isHebrew(questionData.letter)}
                    />
                    <Form.Control.Feedback type="invalid">יש להכניס אות אחת בעברית</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Check
                        type="checkbox"
                        label="אות רפויה \ סין" disabled={!(["פ", "ב", "כ"].includes(questionData.letter))}
                        checked={questionData.alt_form && ["פ", "ב", "כ"].includes(questionData.letter)}
                        onChange={(e) => setQuestionData({ ...questionData, alt_form: e.target.checked })} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    צליל להצגה
                </Form.Label>
                <Col sm={3}>
                    <Form.Check
                        inline
                        type="checkbox"
                        label=" כמו צליל השיעור"
                        checked={isDefaultVowel}
                        onChange={(e) => setIsDefaultVowel(e.target.checked)} />
                </Col>
                <Col sm={5}>
                    <Form.Select
                        onChange={(e) => setQuestionData({ ...questionData, vowel: e.target.value as VOWEL })}
                        value={questionData.vowel}
                        disabled={isDefaultVowel}>
                        <option value="a">קמץ, פתח</option>
                        <option value="e">חיריק</option>
                        <option value="i">חולם</option>
                        <option value="o">קובוץ, שורוק</option>
                        <option value="u">סגול, צירה</option>
                    </Form.Select>
                </Col>
            </Form.Group>
        </Container>
    )
}
