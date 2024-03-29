import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import 'src/assets/styles/MainPage.css'
import LessonForm from './LessonForm.tsx';



export default function NewLessonDialog(props) {

    const onSubmit = function (lessonData) {
        props.saveLesson(lessonData)
        props.onHide()
    }

    return (
        <>
            <Modal
                show={props.visible}
                onHide={props.onHide}
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>שיעור חדש</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LessonForm
                        onSubmit={onSubmit}
                        showQuestions={false} />
                </Modal.Body>
            </Modal>
        </>
    );
}