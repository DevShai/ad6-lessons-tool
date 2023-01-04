import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Image } from "react-bootstrap";
import { FileData, QuestionDataDrawLine } from "src/datatypes/datatypes";

export default function QuestionFormDrawLine(props) {

    const [questionData, setQuestionData] = useState(new QuestionDataDrawLine())

    useEffect(() => {
        if (props.questionData) {
            setQuestionData(props.questionData)
            /* for (let i = 0; i < props.questionData.words.length; i++) {
                var base64string = props.questionData.words[i].texture.base64
                if (typeof(base64string) == "string") {
                    addNewWord(props.questionData.words[i].word.text, getFile(base64string, i))
                }
            } */
        }
    }, [props.idx])

    useEffect(() => {
        if (props.updateFunc) {
            props.updateFunc(props.idx, questionData)
        }
    }, [questionData])

    const getBase64 = function (file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    const getFile = function (base64Data: string, idx: number, contentType = "", sliceSize = 512) {
        var byteCharacters = window.atob(base64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        console.log(byteArrays);

        return new File(byteArrays, "img-" + idx, { type: contentType });
    }

    const addNewWord = function (word: string = '', img: FileData = undefined) {
        var newData = { ...questionData }
        newData.words.push({ word: { text: word, audio: undefined }, definition: undefined, texture: img })
        setQuestionData(newData)
    }

    const updateWord = async function (idx: number, word: string, img: FileData) {
        var newData = { ...questionData }
        if (img != undefined) {
            var newBase64 = await getBase64(img.fileObject)
            if (newBase64.indexOf(',') >= 0) {
                newBase64 = newBase64.split(',')[1];
            }
            img.base64 = newBase64
        }
        newData.words[idx] = { word: { text: word, audio: undefined }, definition: undefined, texture: img }
        setQuestionData(newData)
    }

    const getImgPreview = function (idx: number) {
        try {
            var fileObject = getFile(questionData.words[idx].texture.base64, idx)
            var img = URL.createObjectURL(fileObject)
            return img
        } catch (e) {
            return ''
        }
    }

    const getRow = function (idx: number) {
        return (
            <Row key={idx}>
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
                        required
                        accept="image/png, image/jpeg, image/jpg, image/svg"
                        onChange={(e) => updateWord(
                            idx, questionData.words[idx].word.text,
                            { base64: '', fileObject: (e.target as HTMLInputElement).files[0] })}
                    />
                </Col>
                <Col>
                    <Image
                        src={getImgPreview(idx)}
                        rounded
                        fluid
                        style={{maxHeight: "100px"}} />
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