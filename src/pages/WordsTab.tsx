import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import TextWithAudioField from "src/components/fields/TextWithAudioField";
import NewWordDialog from "src/components/lessons/NewWordDialog";
import { Lesson, QUESTION_TYPES, Question, QuestionDataDrawLine, QuestionDataMaleFemale, QuestionDataReadText, WORD_GENDER, WordData } from "src/types/datatypes";

const tableBody = function (words: Array<WordData>) {
    return <tbody>
        {words.map((value, idx) => <tr>
            <td>
                {idx}
            </td>
            <td>
                <Form.Control type="text" value={value.word.text} />
            </td>
            <td>
                <Form.Control as="textarea" rows={3} value={""} />
            </td>
            <td>
                <Form.Control as="textarea" rows={3} value={""} />
            </td>
        </tr>)}
    </tbody>
}

export default function WordsTab({ words }) {

    const [wordsList, setWordsList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    return <Container fluid style={{ padding: "1rem" }}>
        <NewWordDialog
            onHide={() => {setModalVisible(false)}}
            visible={modalVisible} />
        <Button variant="primary" onClick={(e) => setModalVisible(true)}>הוספה</Button>
        <Table striped bordered hover size="max" style={{ alignSelf: "center" }}>
            <thead>
                <tr>
                    <th >#</th>
                    <th>מילה</th>
                    <th>מילים נרדפות</th>
                    <th>מילים ניגודיות</th>


                </tr>
            </thead>
            {tableBody(wordsList)}
        </Table>
    </Container>
}