import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'src/assets/styles/MainPage.css'
import { TextWithVoice, WordsPair, WordsPairType, getBase64 } from 'src/types/datatypes';
import { Form } from 'react-bootstrap';
import WordsPairInput from '../fields/WordsPairInput';

interface FieldProps {
    visible: boolean
    onHide?: () => void;
    onSubmit?: () => void;
}

const AddPairModal: React.FC<FieldProps> = ({
    visible = false,
    onHide,
    onSubmit,
}) => {

    const [pair, setPair] = useState<WordsPair>({
        firstWord: { word: { text: "", audio: { base64: "", fileObject: null } } }, 
        secondWord:{ word: { text: "", audio: { base64: "", fileObject: null } } }, 
        type: WordsPairType.SYNONYM
    })
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
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default AddPairModal;