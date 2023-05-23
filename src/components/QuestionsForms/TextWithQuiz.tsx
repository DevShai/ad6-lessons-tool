import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Container, Button, CloseButton } from 'react-bootstrap';
import { MultipleSelectionQuestion, QuestionDataReadText, TextWithVoice, WordData, getBase64, getMediaPreview } from 'src/datatypes/datatypes';
import 'src/styles/MainPage.css'
import MultipleSelectionQuestionForm from './MultipleSelectionQuestion';

export default function QuestionFormTextWithQuiz(props) {

    const [questionData, setQuestionData] = useState(new QuestionDataReadText())

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

    const addQuizQuestion = function () {
        var newQuestionData = { ...questionData }
        newQuestionData.quiz.push(new MultipleSelectionQuestion())
        setQuestionData(newQuestionData)
    }

    const updateQuizQuestion = function (idx: number, newData: MultipleSelectionQuestion) {
        var newQuestionData = { ...questionData }
        newQuestionData.quiz[idx] = newData
        setQuestionData(newQuestionData)
    }

    const addDifficultWord = function () {
        var newQuestionData = { ...questionData }
        var newWord: WordData = { word: { text: '', audio: {fileObject: null, base64: ''} }, definition: { text: '', audio: {fileObject: null, base64: ''} } } 
        newQuestionData.definitions.push(newWord)
        setQuestionData(newQuestionData)
    }

    const deleteDifficultWord = function (idx: number) {
        var newQuestionData = { ...questionData }
        newQuestionData.definitions.splice(idx, 1)
        setQuestionData(newQuestionData)
    }

    const updateDifficultWordText = function (idx: number, newWordText: string, newDefinitionText: string) {
        var newQuestionData = { ...questionData }
        newQuestionData.definitions[idx].word.text = newWordText
        newQuestionData.definitions[idx].definition.text = newDefinitionText
        setQuestionData(newQuestionData)
    }

    const updateDifficultWordAudio = async function (idx: number, newWordAudio: File, newDefinitionAudio: File) {
        var newQuestionData = { ...questionData }
        newQuestionData.definitions[idx].word.audio.fileObject = newWordAudio
        newQuestionData.definitions[idx].word.audio.base64 = await getBase64(newWordAudio)

        newQuestionData.definitions[idx].definition.audio.fileObject = newDefinitionAudio
        newQuestionData.definitions[idx].definition.audio.base64 = await getBase64(newDefinitionAudio)
        
        setQuestionData(newQuestionData)
    }

    const getDifficultWordRow = function (idx: number) {
        return (
            <Row key={idx}>
                <Col sm={1}>
                    <CloseButton onClick={(e) => deleteDifficultWord(idx)} />
                </Col>
                <Col>
                    <Form.Control
                        required
                        placeholder="מילה"
                        onChange={(e) => updateDifficultWordText(
                            idx,
                            e.target.value,
                            questionData.definitions[idx].definition.text)}
                        value={questionData.definitions[idx].word.text} />
                </Col>
                <Col>
                    <Form.Control
                        id={"recording_word_" + idx}
                        type="file"
                        accept=".mp3"
                        onChange={(e) => updateDifficultWordAudio(
                            idx,
                            (e.target as HTMLInputElement).files[0],
                            questionData.definitions[idx].definition.audio.fileObject
                        )}
                    />
                </Col>
                <Col>
                    <audio controls src={getMediaPreview(questionData.definitions[idx].word.audio.base64, "word-" + idx)} />
                </Col>
            </Row>
        )
    }

    const getDefinitionRow = function (idx: number) {
        return (
            <Row key={idx}>
                <Col sm={1}>
                    
                </Col>
                <Col>
                    <Form.Control
                        required
                        placeholder="הגדרה"
                        onChange={(e) => updateDifficultWordText(
                            idx,
                            questionData.definitions[idx].word.text,
                            e.target.value,
                        )}
                        value={questionData.definitions[idx].definition.text} />
                </Col>
                <Col>
                    <Form.Control
                        id={"recording_definition_" + idx}
                        type="file"
                        accept=".mp3"
                        onChange={(e) => updateDifficultWordAudio(
                            idx,
                            questionData.definitions[idx].word.audio.fileObject,
                            (e.target as HTMLInputElement).files[0]
                        )}
                    />
                </Col>
                <Col>
                    <audio controls src={getMediaPreview(questionData.definitions[idx].definition.audio.base64, "word-" + idx)} />
                </Col>
            </Row>
        )
    }


    return (
        <Container fluid>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    כותרת הטקסט
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type='text'
                        value={questionData.text_title.text}
                        onChange={(e) => setQuestionData({ ...questionData, text_title: { text: e.target.value, audio: undefined } })} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    טקסט
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        as='textarea'
                        value={questionData.text.text}
                        onChange={(e) => setQuestionData({ ...questionData, text: { text: e.target.value, audio: undefined } })} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    מילים קשות
                </Form.Label>
                <Col sm={10}>
                    <Button onClick={() => (addDifficultWord())}>+</Button>
                    {questionData.definitions.map((val, idx) => <Form.Group>
                        {getDifficultWordRow(idx)} <br/>
                        {getDefinitionRow(idx)}
                    </Form.Group>)}
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    שאלות
                </Form.Label>
                <Col sm={10}>
                    <Button onClick={() => addQuizQuestion()}>+</Button>
                    {questionData.quiz.map((_val, idx) =>
                        <MultipleSelectionQuestionForm
                            key={idx}
                            idx={idx}
                            data={questionData.quiz[idx]}
                            updateQuizQuestion={updateQuizQuestion} />)}
                </Col>
            </Form.Group>
        </Container>
    );
}