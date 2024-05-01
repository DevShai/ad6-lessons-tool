import LessonsList from 'src/components/lessons/LessonsList';
import NewLessonDialog from 'src/components/lessons/NewLessonDialog';
import { Button, Container, Form, FormLabel } from 'react-bootstrap';
import { useState } from 'react';
import EditLesson from '../components/lessons/EditLesson';
import 'src/assets/styles/MainPage.css'
import React from 'react';
import { useLocalStorage } from 'usehooks-ts';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LessonsTab from './LessonsTab';
import { Lesson, WordData } from 'src/types/datatypes';
import WordsTab from './WordsTab';

export default function MainPage() {

    const [lessonsList, setLessonsList] = useLocalStorage("lessons", []);
    const [currentTab, setCurrentTab] = useState("lessons");

    return (
        <div className="MainPage">
            <Container>
                <h1>כלי ניהול שיעורים</h1>
            </Container>
            <br />
            <Tabs
                id="main-page-tabs"
                activeKey={currentTab}
                onSelect={(k) => setCurrentTab(k)}
                className="tabs-container"

            >
                <Tab title="שיעורים" eventKey={"lessons"}>
                    <LessonsTab
                        lessonsList={lessonsList}
                        setLessonsList={setLessonsList} />
                </Tab>
                <Tab title="מאגר מילים" eventKey={"words"}>
                    <WordsTab lessons={lessonsList}/>
                </Tab>

            </Tabs>
            <br />
        </div >
    );
}