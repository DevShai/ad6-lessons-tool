import React, { useState } from "react";
import { Accordion, Button, Container, Table } from "react-bootstrap";
import AddPairModal from "src/components/lessons/AddPairModal";
import { WordsPair, WordsPairType, download } from "src/types/datatypes";

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

const exportList = (list: Array<WordsPair>): void => {
    download(JSON.stringify(list, undefined, '\t'), "רשימת מילים " + new Date().toLocaleDateString() + ".json", "text/plain");
}

interface FieldProps {
    pairs: Array<WordsPair>
}

const WordsTab: React.FC<FieldProps> = ({
    pairs = [],
}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const addPair = () => {
        <div>
            <AddPairModal
                onHide={() => { setModalVisible(false) }}
                visible={modalVisible} />
            <Button variant="primary" onClick={(e) => setModalVisible(true)}>הוספה</Button>
        </div>
    }

    return <Container fluid style={{ padding: "1rem" }}>
        <Button onClick={(e) => exportList(pairs)}>ייצוא</Button>
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