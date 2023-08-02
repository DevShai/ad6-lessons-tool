import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Image, CloseButton } from "react-bootstrap";
import { FileData, getBase64, getMediaPreview, QuestionDataSyllable } from "src/types/datatypes";
import TextWithAudioField from "../fields/TextWithAudioField";

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
        newData.syllables.push({ text: syllable, audio: {base64: '', fileObject: undefined} })
        setQuestionData(newData)
    }

    const deleteSyllable = function (idx) {
        var newData = { ...questionData }
        newData.syllables.splice(idx, 1)
        setQuestionData(newData)
    }

    const updateSyllable = async function (idx: number, syllable: string, audio: File) {
        var newData = { ...questionData }
        var base64Data: string = await getBase64(audio)
        newData.syllables[idx] = { text: syllable, audio: { fileObject: audio, base64: base64Data } }
        setQuestionData(newData)
    }

    const updateRecording = async function (recording: File) {
        var newData = { ...questionData }
        var base64Data: string = await getBase64(recording)
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
                        placeholder="הברה"
                        onChange={(e) => updateSyllable(idx, e.target.value, questionData.syllables[idx].audio.fileObject)}
                        value={questionData.syllables[idx].text} />
                </Col>
                <Col>
                    <Form.Control
                        id={"recording_" + idx}
                        type="file"
                        accept="audio/*"
                        isValid={questionData.syllables[idx].audio.fileObject != undefined}
                        onChange={(e) => updateSyllable(idx, questionData.syllables[idx].text, (e.target as HTMLInputElement).files[0])}
                    />
                </Col>
                <Col>
                    <audio controls src={getMediaPreview(questionData.syllables[idx].audio.base64, "syllable-" + idx)} />
                </Col>
            </Row>
        )
    }

    return (
        <Container fluid>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    הקלטה של המילה\המשפט במלואו
                </Col>
                <Col>
                    <Form.Control
                        id={"recording_upload"}
                        type="file"
                        isValid={questionData.answer_audio.fileObject != undefined}
                        accept="audio/*"
                        onChange={(e) => updateRecording((e.target as HTMLInputElement).files[0])}
                    />
                </Col>
                <Col>
                    <audio controls src={getMediaPreview(questionData.answer_audio.base64, "recording")} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>הברות ({questionData.syllables.length})</Form.Label>
                <Col sm={2}>
                    <Button
                        onClick={(e) => addSyllable()}>+
                    </Button>
                </Col>
                <Row>
                    <Col>
                        {questionData.syllables.map((_val, idx) => getSyllableRow(idx))}
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    )
}