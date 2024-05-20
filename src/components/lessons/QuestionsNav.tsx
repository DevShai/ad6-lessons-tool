import React, { useEffect, useState } from 'react';
import { Button, CloseButton, Col, Container, DropdownButton, ListGroup, Row, Stack, Tab, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { CreateQuestion, getDisplayName, GetForm, Question, QUESTION_TYPES, QUESTION_TYPES_INFO } from 'src/types/datatypes';
import 'src/assets/styles/MainPage.css'

const styles = {
    tabs: {
        width: "100%"
    }
}

export default function QuestionsNav(props) {

    const [elements, setElements] = useState([])

    useEffect(() => {
        if (props.elements) {
            setElements(props.elements)
        }
    }, [props.elements])

    const getTabs = function () {
        return (
            <ListGroup style={{ width: "100%" }}>
                {elements.map((val, idx) =>
                    <ListGroup.Item action href={"#" + idx} key={idx}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <CloseButton onClick={() => props.deleteQuestion(idx)} />
                            <span style={{ flexGrow: "1" }}>
                                {(idx + 1) + ". " + getDisplayName(val.type)}
                            </span>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
        )
    }

    const getContent = function () {
        return (<Tab.Content style={{ width: "100%", height: "100%" }}>
            {elements.map((val, idx) =>
                <Tab.Pane key={idx} eventKey={"#" + idx}>
                    {GetForm(val, idx, props.updateQuestion)}
                </Tab.Pane>
            )}
        </Tab.Content>
        )
    }

    return (
        <Container fluid >
            <Row>
                <Col sm={3} style={{ display: 'flex' }}>
                    <h4 style={{ alignSelf: 'center' }}>
                        הוספת תרגיל:
                    </h4>
                </Col>
                <Col>
                    <Stack direction='horizontal' gap={2}>
                    {Object.keys(QUESTION_TYPES_INFO).map((val: any, idx: number) => (
                        <Button
                            key={idx}
                            onClick={() => props.addNewQuestion(QUESTION_TYPES_INFO[val])}>
                            {val}
                        </Button>
                    ))}
                    </Stack>
                </Col>
            </Row>
            <br />
            <Container fluid>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={3}>
                            {getTabs()}
                        </Col>
                        <Col>
                            {getContent()}
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </Container>
    )
}