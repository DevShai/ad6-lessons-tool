import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { MultipleSelectionQuestion } from "src/datatypes/datatypes";

export default function MultipleSelectionQuestionForm(props) {

    const [data, setData] = useState(new MultipleSelectionQuestion())

    useEffect(() => {
        if (props.data) {
            setData(props.data)
        }
    }, [])

    useEffect(() => {
        props.updateQuizQuestion(props.idx, data)
    }, [data])



    const updateArray = function (array: Array<any>, idx: number, newData: any): Array<any> {
        var newArray = [...array]
        newArray[idx] = newData
        return newArray
    }

    const getIncorrectAnswerField = function (idx: number) {
        return (
            <Form.Group as={Row} className="mb-3" key={idx}>
                <Form.Label column sm={2}>
                    תשובה שגויה {idx + 1}
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type='text'
                        onChange={(e) => setData({ ...data, incorrect_answers: updateArray(data.incorrect_answers, idx, { text: e.target.value, texture: undefined }) })}
                        value={data.incorrect_answers[idx].text} />
                </Col>
            </Form.Group>
        )
    }

    return (
        <Container fluid>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    שאלה
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type='text'
                        onChange={(e) => setData({ ...data, question: { text: e.target.value, audio: undefined } })}
                        value={data.question.text} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    תשובה נכונה
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type='text'
                        onChange={(e) => setData({ ...data, correct_answer: { text: e.target.value, texture: undefined } })}
                        value={data.correct_answer.text} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    תשובות שגויות
                </Form.Label>
                <Col sm={10}>
                    {data.incorrect_answers.map((_val, idx) =>  getIncorrectAnswerField(idx) )}
                </Col>
            </Form.Group>
        </Container>
    )

}
