import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { QuestionDataMaleFemale } from "src/datatypes/datatypes";

export default function QuestionFormMaleFemale(props) {

    const [questionData, setQuestionData] = useState(new QuestionDataMaleFemale())

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

    const updatePair = function (idx: number, female: string, male: string) {
        var newData = { ...questionData }
        newData.word_pairs[idx] = { female: female, male: male }
        setQuestionData(newData)
    }

    const addNewPair = function () {
        var newData = { ...questionData }
        newData.word_pairs.push({ male: '', female: '' })
        setQuestionData(newData)
    }

    const getWordsPairRow = function (idx: number) {
        return (
            <Row key={idx}>
                <Col>
                    <Form.Control
                        required
                        placeholder="נקבה"
                        onChange={(e) => updatePair(idx, e.target.value, questionData.word_pairs[idx].male)}
                        value={questionData.word_pairs[idx].female} />
                </Col>
                <Col>
                    <Form.Control
                        required
                        placeholder="זכר"
                        onChange={(e) => updatePair(idx, questionData.word_pairs[idx].female, e.target.value)}
                        value={questionData.word_pairs[idx].male} />
                </Col>
            </Row>

        )
    }

    return (
        <Container fluid>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>מילים ({questionData.word_pairs.length})</Form.Label>
                <Col sm={2}>
                    <Button onClick={addNewPair}>+</Button>
                </Col>
            </Form.Group>
            {questionData.word_pairs.map((_val, idx) => getWordsPairRow(idx))}
        </Container>
    )
}