import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const form = (
    <Form>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                שם השיעור
            </Form.Label>
            <Col sm={10}>
                <Form.Control type="text" placeholder="" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                צליל השיעור
            </Form.Label>
            <Col sm={10}>
                <Form.Select>
                    <option value="mixed">מעורב</option>
                    <option value="a">קמץ, פתח</option>
                    <option value="e">חיריק</option>
                    <option value="i">חולם</option>
                    <option value="o">קובוץ, שורוק</option>
                    <option value="u">סגול, צירה</option>
                </Form.Select>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                אותיות
            </Form.Label>
            <Col sm={10}>
                <Form.Control type="text" placeholder="" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                מבחן
            </Form.Label>
            <Col sm={10}>
                <Form.Check
                    type="switch"
                    id="is_test"
                />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                ערבוב שאלות
            </Form.Label>
            <Col sm={10}>
                <Form.Check
                    type="switch"
                    id="is_shuffle"
                />
            </Col>
        </Form.Group>
        <center>
        <Button type='submit'>שמירה</Button>
        </center>
    </Form>
)

export default function NewLessonDialog(props) {
    return (
        <>
            <Modal
                show={props.visible}
                onHide={props.onHide}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>שיעור חדש</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        </>
    );
}