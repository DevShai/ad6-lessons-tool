import React, { ChangeEvent, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'src/assets/styles/MainPage.css'
import TextWithAudioField from '../fields/TextWithAudioField';
import { TextWithVoice, getBase64 } from 'src/types/datatypes';
import { Col, Form, Row } from 'react-bootstrap';
import FileInput from '../fields/FileInput';

interface FieldProps {
    visible: boolean
    onHide?: () => void;
    onSubmit?: () => void;
    wordData?: TextWithVoice,
    setWordData: (w: TextWithVoice) => void,
}

const NewWordDialog: React.FC<FieldProps> = ({
    visible = false,
    onHide,
    onSubmit,
    wordData = { "text": "", "audio": { base64: '', fileObject: null } },
    setWordData,
}) => {

    const onAudioUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            wordData.audio.fileObject = event.target.files[0]
            wordData.audio.base64 = await getBase64(event.target.files[0])
            
        }
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
                                    <Form.Control type="text" value={wordData.text} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="word-audio">
                                    <Form.Label>הקלטה   </Form.Label>
                                    <FileInput
                                        file={wordData.audio}
                                        filename=''
                                        acceptedFormats='.mp3'
                                        isFileValid={(f) => { return f.fileObject != null }}
                                        onFileChanged={onAudioUpload}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default NewWordDialog;