import React from "react";
import { Form, CloseButton, Stack } from "react-bootstrap";
import { getMediaPreview, TextWithVoice, WordsPair } from "src/types/datatypes";
import FileInput from "./FileInput";


interface FieldProps {
    id: number
    onErase: (id: number) => void,
    pair: WordsPair,
    updateFirstWordText: (idx: number, value: string) => void,
    updateFirstWordAudio: (idx: number, event) => void,
    updateSecondWordText: (idx: number, value: string) => void,
    updateSecondWordAudio: (idx: number, event) => void,

}

const getAudioPreview = (data: TextWithVoice, idx: number) => {
    if (data.audio) {
        return <audio controls src={getMediaPreview(data.audio.base64, "audio-" + idx)} />
    }
    else {
        return ''
    }
}

const WordsPairInput: React.FC<FieldProps> = ({
    id = 0,
    onErase,
    pair = {
        firstWord: { word: { text: "", audio: { base64: '', fileObject: null } } },
        secondWord: { word: { text: "", audio: { base64: '', fileObject: null } } }
    },
    updateFirstWordText,
    updateFirstWordAudio,
    updateSecondWordText,
    updateSecondWordAudio,
}) => {

    return (
        <Stack direction="horizontal" key={id} gap={5}>
            <span>{id + 1}<br /> <CloseButton onClick={(e) => onErase(id)} /></span>
            <Form.Group controlId={id + "first"}>
                <Form.Label>מילה 1</Form.Label>
                <Form.Control
                    type="text"
                    value={pair.firstWord.word.text}
                    onChange={(e) => updateFirstWordText(id, e.target.value)} />
                <FileInput
                    file={pair.firstWord.word.audio}
                    acceptedFormats=".mp3"
                    onFileChanged={(e) => { updateFirstWordAudio(id, e) }} />
            </Form.Group>
            <Form.Group controlId={id + "second"}>
                <Form.Label>מילה 2</Form.Label>
                <Form.Control
                    type="text"
                    value={pair.secondWord.word.text}
                    onChange={(e) => updateSecondWordText(id, e.target.value)} />
                <FileInput
                    file={pair.secondWord.word.audio}
                    acceptedFormats=".mp3"
                    onFileChanged={(e) => updateSecondWordAudio(id, e)} />
            </Form.Group>
        </Stack>
    );
};

export default WordsPairInput;
