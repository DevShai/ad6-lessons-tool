import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Image, CloseButton } from "react-bootstrap";
import { FileData, getBase64, getMediaPreview, QuestionDataDrawLine } from "src/types/datatypes";

export default function QuestionFormDrawLine(props) {

    const [questionData, setQuestionData] = useState(new QuestionDataDrawLine())

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



    const addNewWord = function (word: string = '', img: FileData = {base64: '', fileObject: undefined}) {
        var newData = { ...questionData }
        newData.words.push({ word: { text: word }, texture: img })
        setQuestionData(newData)
    }

    const deleteWord = function (idx) {
        var newData = { ...questionData }
        newData.words.splice(idx, 1)
        setQuestionData(newData)
    }

    const updateWord = async function (idx: number, word: string, img: FileData) {
        var newData = { ...questionData }
        if (img != undefined) {
            var newBase64 = await getBase64(img.fileObject)
            img.base64 = newBase64
        }
        newData.words[idx] = { word: { text: word, audio: undefined }, definition: undefined, texture: img }
        setQuestionData(newData)
    }


    const getRow = function (idx: number) {
        return (
            <Row key={idx}>
                <Col sm={1}>
                    <CloseButton onClick={(e) => deleteWord(idx)} />
                </Col>
                <Col>
                    <Form.Control
                        required
                        placeholder="מילה"
                        onChange={(e) => updateWord(idx, e.target.value, questionData.words[idx].texture)}
                        value={questionData.words[idx].word.text} />
                </Col>
                <Col>
                    <Form.Control
                        id={"file_upload_" + idx}
                        type="file"
                        isValid={questionData.words[idx].texture.fileObject != undefined}
                        accept="image/png, image/jpeg, image/jpg, image/svg"
                        onChange={(e) => updateWord(
                            idx, questionData.words[idx].word.text,
                            { base64: '', fileObject: (e.target as HTMLInputElement).files[0] })}
                    />
                </Col>
                <Col>
                    {questionData.words[idx].texture ?
                        <Image
                            src={getMediaPreview(questionData.words[idx].texture.base64, "img-" + idx)}
                            rounded
                            fluid
                            style={{ maxHeight: "100px" }} /> : ""}
                </Col>
            </Row>
        )
    }

    return (
        <Container fluid>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>מילים ({questionData.words.length})</Form.Label>
                <Col sm={2}>
                    <Button
                        onClick={(e) => addNewWord()}>+
                    </Button>
                </Col>
            </Form.Group>
            {questionData.words.map((_val, idx) => getRow(idx))}
        </Container>
    )
}