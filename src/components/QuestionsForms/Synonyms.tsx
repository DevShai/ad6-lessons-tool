import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, CloseButton, Stack } from "react-bootstrap";
import { FileData, QuestionDataMaleFemale, QuestionDataSynonyms, WordsPair, WordsPairType, getBase64 } from "src/types/datatypes";
import FileInput from "../fields/FileInput";
import TextWithAudioField from "../fields/TextWithAudioField";
import WordsPairInput from "../fields/WordsPairInput";

export default function QuestionFormSynonyms(props) {

    const [questionData, setQuestionData] = useState(new QuestionDataSynonyms())
    const [pairs, setPairs] = useState<Array<WordsPair>>([])
    const [questionMode, setQuestionMode] = useState(WordsPairType.SYNONYM)

    useEffect(() => {
        if (props.questionData) {
            setPairs([...props.questionData.pairs])
            setQuestionMode(props.questionData.mode)
        }
    }, [props.idx])

    useEffect(() => {
        if (props.updateFunc) {
            props.updateFunc(props.idx, questionData)
        }
    }, [questionData])

    useEffect(() => {
        questionData.pairs = pairs
        questionData.mode = questionMode
        pairs.forEach(pair => {
            pair.type = questionMode
        });
        setQuestionData({ ...questionData })
    }, [pairs, questionMode])

    const addPair = () => {
        let newPair: WordsPair = {
            firstWord: { word: { text: "", audio: { base64: "", fileObject: null } } },
            secondWord: { word: { text: "", audio: { base64: "", fileObject: null } } },
            type: questionMode
        }
        setPairs([...pairs, newPair])
    }

    const erasePair = (idx: number) => {
        pairs.splice(idx, 1)
        setPairs([...pairs])
    }

    const updateFirstWordText = (idx, value) => {
        pairs[idx].firstWord.word.text = value
        setPairs([...pairs]);
    }

    const updateFirstWordAudio = async (idx, event) => {
        if (event.target.files) {
            pairs[idx].firstWord.word.audio.fileObject = event.target.files[0]
            pairs[idx].firstWord.word.audio.base64 = await getBase64(event.target.files[0])
            setPairs([...pairs]);
        }
    }

    const updateSecondWordText = (idx, value) => {
        pairs[idx].secondWord.word.text = value
        setPairs([...pairs]);
    }

    const updateSecondWordAudio = async (idx, event) => {
        if (event.target.files) {
            pairs[idx].secondWord.word.audio.fileObject = event.target.files[0]
            pairs[idx].secondWord.word.audio.base64 = await getBase64(event.target.files[0])
            setPairs([...pairs]);
        }
    }

    return (
        <Container fluid>
            <Stack direction="horizontal">
                <Form.Label style={{ minWidth: "100px" }}>סוג שאלה </Form.Label>
                <Form.Select
                    aria-label="סוג שאלה"
                    onChange={(e) => setQuestionMode((e.target.value as unknown) as WordsPairType)}
                    value={questionMode}>
                    <option value={WordsPairType.SYNONYM}>מילים נרדפות</option>
                    <option value={WordsPairType.OPPOSITE}>מילים ניגודיות</option>
                </Form.Select>
            </Stack>
            {pairs.map((val, idx) => (
                <WordsPairInput
                    key={idx}
                    id={idx}
                    pair={val}
                    onErase={erasePair}
                    updateFirstWordAudio={updateFirstWordAudio}
                    updateFirstWordText={updateFirstWordText}
                    updateSecondWordAudio={updateSecondWordAudio}
                    updateSecondWordText={updateSecondWordText}
                />
            ))}
            <Button onClick={addPair}>+</Button>
        </Container >
    )
}