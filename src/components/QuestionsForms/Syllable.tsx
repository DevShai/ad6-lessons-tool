import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Image, CloseButton } from "react-bootstrap";
import { FileData, getBase64, getMediaPreview, QuestionDataSyllable } from "src/datatypes/datatypes";

export default function QuestionFormSyllable(props) {

    const [questionData, setQuestionData] = useState(new QuestionDataSyllable())

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



    const addSyllable = function (syllable: string = '') {
        var newData = { ...questionData }
        newData.syllables.push(syllable)
        setQuestionData(newData)
    }

    const deleteSyllable = function (idx) {
        var newData = { ...questionData }
        newData.syllables.splice(idx, 1)
        setQuestionData(newData)
    }

    const updateSyllable = function (idx: number, syllable: string) {
        var newData = { ...questionData }
        newData.syllables[idx] = syllable
        setQuestionData(newData)
    }

    const updateRecording = async function (recording: File) {
        var newData = { ...questionData }
        var base64Data: string = await getBase64(recording)
        if (base64Data.indexOf(',') >= 0) {
            base64Data = base64Data.split(',')[1];
        }
        newData.answer_audio = { base64: base64Data, fileObject: recording }
        setQuestionData(newData)
    }


    const getSyllableRow = function (idx: number) {
        return (
            <Row key={idx}>
                <Col sm={1}>
                    <CloseButton onClick={(e) => deleteSyllable(idx)} />
                </Col>
                <Col>
                    <Form.Control
                        required
                        placeholder="הבהרה"
                        onChange={(e) => updateSyllable(idx, e.target.value)}
                        value={questionData.syllables[idx]} />
                </Col>
            </Row>
        )
    }

    return (
        <Container fluid>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    הקלטה
                </Col>
                <Col>
                    <Form.Control
                        id={"recording_upload"}
                        type="file"
                        required
                        accept="audio/*"
                        onChange={(e) => updateRecording((e.target as HTMLInputElement).files[0])}
                    />
                </Col>
                <Col>
                    <audio controls src={getMediaPreview(questionData.answer_audio.base64, "recording")}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>הבהרות ({questionData.syllables.length})</Form.Label>
                <Col sm={2}>
                    <Button
                        onClick={(e) => addSyllable()}>+
                    </Button>
                    {questionData.syllables.map((_val, idx) => getSyllableRow(idx))}
                </Col>
            </Form.Group>
        </Container>
    )
}