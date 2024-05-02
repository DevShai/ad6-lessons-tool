import React, { ChangeEvent, EventHandler, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'src/assets/styles/MainPage.css'
import { TextWithVoice, WordData, getBase64 } from 'src/types/datatypes';
import { Col, Form, Row } from 'react-bootstrap';
import FileInput from '../fields/FileInput';

interface FieldProps {
    visible: boolean
    onHide?: () => void;
    onSubmit?: () => void;
}

const NewWordDialog: React.FC<FieldProps> = ({
    visible = false,
    onHide,
    onSubmit,
}) => {

    const [word, setWord] = useState<TextWithVoice>({ text: "", audio: { base64: "", fileObject: null } })
    const [definition, setDefinition] = useState<TextWithVoice>({ text: "", audio: { base64: "", fileObject: null } })

    const onWordAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            var updated = { ...word }
            updated.audio.fileObject = event.target.files[0]
            updated.audio.base64 = await getBase64(event.target.files[0])
            setWord(updated)
        }
    }

    const onWordTextChange = async (event) => {
        var updated = { ...word }
        updated.text = event.target.value;
        setWord(updated)
    }

    const onDefinitionAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            var updated = { ...definition }
            updated.audio.fileObject = event.target.files[0]
            updated.audio.base64 = await getBase64(event.target.files[0])
            setWord(updated)
        }
    }

    const onDefinitionTextChange = async (event) => {
        var updated = { ...definition }
        updated.text = event.target.value;
        setWord(updated)
    }

    return (
        <>
            <Modal
                show={visible}
                onHide={onHide}
                keyboard={false}
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>הוספת מילה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="word-text">
                                    <Form.Label>מילה</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={word.text}
                                        onChange={onWordTextChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="word-audio">
                                    <Form.Label>הקלטה   </Form.Label>
                                    <FileInput
                                        file={word.audio}
                                        filename=''
                                        acceptedFormats='.mp3'
                                        isFileValid={(f) => { return f.fileObject != null }}
                                        onFileChanged={onWordAudioUpload}
                                    />
                                </Form.Group>
                            </Col>
                            <Row>
                                <Col>
                                    <Form.Group controlId="word-text">
                                        <Form.Label>הגדרה</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={definition.text}
                                            onChange={onDefinitionTextChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="word-audio">
                                        <Form.Label>הקלטה   </Form.Label>
                                        <FileInput
                                            file={definition.audio}
                                            filename=''
                                            acceptedFormats='.mp3'
                                            isFileValid={(f) => { return f.fileObject != null }}
                                            onFileChanged={onDefinitionAudioUpload}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default NewWordDialog;