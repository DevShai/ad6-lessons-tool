import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, CloseButton } from "react-bootstrap";
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

    const updateWord = (female: boolean, idx: number, newVal: string) => {
        var newData = { ...questionData }
        if (female) {
            newData.female_words[idx] = newVal
        } else {
            newData.male_words[idx] = newVal
        }
        setQuestionData(newData)
    }

    const addNewWord = (female: boolean) => {
        var newData = { ...questionData }
        if (female) {
            newData.female_words.push("")
        } else {
            newData.male_words.push("")
        }
        setQuestionData(newData)
    }

    const deleteWord = (female: boolean, idx: number) => {
        var newData = { ...questionData }
        if (female) {
            newData.female_words.splice(idx, 1)
        } else {
            newData.male_words.splice(idx, 1)
        }
        setQuestionData(newData)
    }



    return (
        <Container fluid>
            <Row>
                <Col>
                    <span> נקבה </span>
                </Col>
                <Col>
                    <span> זכר </span>
                </Col>
            </Row>
            <Row>
                <Col>
                    {questionData.female_words.map((val, idx) => (
                        <Row>
                            <Col sm={2} style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}>
                                <CloseButton onClick={() => deleteWord(true, idx)} />
                            </Col>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    key={idx}
                                    type="text"
                                    placeholder="מילה..."
                                    value={val}
                                    onChange={(e) => updateWord(true, idx, e.target.value)} />
                            </Col>
                        </Row>
                    ))}
                    <Button onClick={() => addNewWord(true)}>+</Button>

                </Col>
                <Col>
                    {questionData.male_words.map((val, idx) => (
                        <Row>
                            <Col sm={2} style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}>
                                <CloseButton onClick={() => deleteWord(false, idx)} />
                            </Col>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    key={idx}
                                    type="text"
                                    placeholder="מילה..."
                                    value={val}
                                    onChange={(e) => updateWord(false, idx, e.target.value)} />
                            </Col>
                        </Row>
                    ))}
                    <Button onClick={() => addNewWord(false)}>+</Button>
                </Col>
            </Row >

        </Container >
    )
}