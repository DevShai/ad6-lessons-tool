import React from "react";
import { Form, Col, Row, CloseButton } from "react-bootstrap";
import { getMediaPreview, TextWithVoice } from "src/types/datatypes";


interface FieldProps {
    wordData: TextWithVoice
    textLabel?: string;
    idx?: number;
    onAudioChanged?: () => void;
    onTextChanged?: () => void;
    onClosePressed?: () => void;
    isAudioValid?: boolean
}

const getAudioPreview = (data: TextWithVoice, idx: number) => {
    if (data.audio) {
        return <audio controls src={getMediaPreview(data.audio.base64, "audio-" + idx)} />
    }
    else {
        return ''
    }
}

const TextWithAudioField: React.FC<FieldProps> = ({
    wordData,
    textLabel = '',
    idx = 0,
    onAudioChanged = () => { },
    onTextChanged = () => {},
    onClosePressed = () => { },
    isAudioValid = true }) => {

    return (
        <Row key={idx}>
            <Col sm={1}>
                <CloseButton onClick={onClosePressed} />
            </Col>
            <Col>
                <Form.Control
                    required
                    placeholder={textLabel}
                    onChange={onTextChanged}
                    value={wordData.text} />
            </Col>
            <Col>
                <Form.Control
                    id={"recording_" + idx}
                    type="file"
                    accept=".mp3"
                    isValid={isAudioValid}
                    onChange={onAudioChanged}
                />
            </Col>
            <Col>
                {getAudioPreview(wordData, idx)}
            </Col>
        </Row>
    );
};

export default TextWithAudioField;
