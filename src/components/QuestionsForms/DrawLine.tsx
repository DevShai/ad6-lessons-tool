import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { QuestionDataDrawLine } from "src/datatypes/datatypes";

export default function QuestionFormDrawLine(props) {

    const [questionData, setQuestionData] = useState(new QuestionDataDrawLine())

    useEffect(() => {
        if (props.questionData) {
            for (let i = 0; i < props.questionData.words.length; i++) {
                var base64string = props.questionData.words[i].texture
                if (typeof(base64string) == "string") {
                    addNewWord(props.questionData.words[i].word.text, getFile(base64string, i))
                }
            }
        }
    }, [props.idx])

    useEffect(() => {
        if (props.updateFunc) {
            props.updateFunc(props.idx, questionData)
        }
    }, [questionData])

    const getBase64 = function (file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
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

    const addNewWord = function (word: string = '', img: File = undefined) {
        var newData = { ...questionData }
        newData.words.push({ word: { text: word, audio: undefined }, definition: undefined, texture: img })
        setQuestionData(newData)
    }

    const updateWord = async function (idx: number, word: string, img: File) {
        var newData = { ...questionData }
        var base64string = questionData.words[idx].texture
        if (typeof(img) != 'string' && img != undefined) {
            base64string = await getBase64(img)
            if (base64string.indexOf(',') >= 0) {
                base64string = base64string.split(',')[1];
            }
        }
        newData.words[idx] = { word: { text: word, audio: undefined }, definition: undefined, texture: base64string }
        setQuestionData(newData)
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
                        type="file"
                        required
                        accept="image/png, image/jpeg, image/jpg, image/svg"
                        onChange={(e) => updateWord(
                            idx, questionData.words[idx].word.text,
                            (e.target as HTMLInputElement).files[0])} />
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