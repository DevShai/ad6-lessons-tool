import React, { useEffect, useState } from 'react';
import { Col, Container, DropdownButton, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { CreateQuestion, GetForm, Question, QUESTION_TYPES, QUESTION_TYPES_INFO } from 'src/datatypes/datatypes';
import 'src/styles/MainPage.css'

const styles = {
    row: {
        width: "70%"
    },
    col: {
        flexGrow: 0
    },
    content: {
        height: "100%"
    }
}

export default function QuestionsNav(props) {

    const [elements, setElements] = useState([])
    const [activeElementIdx, setActiveElementIdx] = useState(-1)

    useEffect(() => {
        if (props.elements) {
            setElements(props.elements)
        }
    }, [props.elements])

    return (
        <div style={styles.row}>
            <Row style={styles.row}>
                <Col style={styles.col}>
                    <ToggleButtonGroup type='radio' name='elements'>
                        {elements.map((_val: any, idx: number) => (
                            <ToggleButton
                                id={idx as unknown as string}
                                key={idx}
                                value={idx}
                                checked={idx == activeElementIdx}
                                onClick={() => setActiveElementIdx(idx)}>
                                {idx + 1}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Col>
                <Col style={styles.col}>
                    <DropdownButton variant="success" title="הוספה" align="end">
                        {Object.keys(QUESTION_TYPES_INFO).map((val: any, idx: number) => (
                            <DropdownItem
                                key={idx}
                                onClick={() => props.addNewQuestion(QUESTION_TYPES_INFO[val])}>
                                {val}
                            </DropdownItem>
                        ))}
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                {(activeElementIdx !== -1) ? GetForm(elements[activeElementIdx], activeElementIdx, props.updateQuestion) : ""}
            </Row>
        </div>
    );
}