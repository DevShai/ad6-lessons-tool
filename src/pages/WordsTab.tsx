import React, { useState } from "react";
import { Accordion, Button, Container, Form, Table } from "react-bootstrap";
import TextWithAudioField from "src/components/fields/TextWithAudioField";
import NewWordDialog from "src/components/lessons/NewWordDialog";
import { Lesson, QUESTION_TYPES, Question, QuestionDataDrawLine, QuestionDataMaleFemale, QuestionDataReadText, WORD_GENDER, WordData, WordsPair, WordsPairType } from "src/types/datatypes";

const getTable = (pairs: Array<WordsPair>) => {
    if (pairs.length == 0) {
        return <span>לא הוספו מילים</span>
    } else {
        return <Table striped hover>
            <thead>
                <tr>
                    <th> </th>
                    <th>מילה 1</th>
                    <th>מילה 2</th>
                </tr>
            </thead>
            <tbody>
                {pairs.map((value, idx) =>
                    <tr key={idx}>
                        <td>
                            {idx + 1}
                        </td>
                        <td>
                            {value.firstWord.word.text}
                        </td>
                        <td>
                            {value.secondWord.word.text}
                        </td>
                    </tr>)}
            </tbody>
        </Table>
    }
}

const getOpposites = (list: Array<WordsPair>): Array<WordsPair> => {
    return list.filter((val: WordsPair) => { return val.type == WordsPairType.OPPOSITE })
}

const getSynonyms = (list: Array<WordsPair>): Array<WordsPair> => {
    return list.filter((val: WordsPair) => { return val.type == WordsPairType.SYNONYM })
}

interface FieldProps {
    pairs: Array<WordsPair>
}

const WordsTab: React.FC<FieldProps> = ({
    pairs = [],
}) => {

    const [modalVisible, setModalVisible] = useState(false);

    return <Container fluid style={{ padding: "1rem" }}>
        <NewWordDialog
            onHide={() => { setModalVisible(false) }}
            visible={modalVisible} />
        <Button variant="primary" onClick={(e) => setModalVisible(true)}>הוספה</Button>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>מילים נרדפות</Accordion.Header>
                <Accordion.Body>
                    {getTable(getSynonyms(pairs))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>מילים מנוגדות</Accordion.Header>
                <Accordion.Body>
                    {getTable(getOpposites(pairs))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </Container>
}
export default WordsTab