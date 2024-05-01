import React, { ChangeEvent, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'src/assets/styles/MainPage.css'
import TextWithAudioField from '../fields/TextWithAudioField';
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

    const [newWord, setNewWord] = useState<WordData>({word: {text: ""}, definition: {text: ""}});


    const onWordAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            newWord.word.audio.fileObject = event.target.files[0]
            newWord.word.audio.base64 = await getBase64(event.target.files[0])
        }
    }

    const onWordTextChange = async (event) => {
        var prev = newWord
        prev.word.text = event.target.value
        setNewWord(prev);
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
                                        value={newWord.word.text}
                                        onChange={onWordTextChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="word-audio">
                                    <Form.Label>הקלטה   </Form.Label>
                                    <FileInput
                                        file={newWord.word.audio}
                                        filename=''
                                        acceptedFormats='.mp3'
                                        isFileValid={(f) => { return f.fileObject != null }}
                                        onFileChanged={onWordAudioUpload}
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