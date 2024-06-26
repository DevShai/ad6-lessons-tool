import { Container } from 'react-bootstrap';
import { useState } from 'react';
import 'src/assets/styles/MainPage.css'
import React from 'react';
import { useLocalStorage } from 'usehooks-ts';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LessonsTab from './LessonsTab';
import { Lesson, QUESTION_TYPES, QuestionDataSynonyms, WordsPair } from 'src/types/datatypes';
import WordsTab from './WordsTab';

export default function MainPage() {

    const [lessonsList, setLessonsList] = useLocalStorage<Array<Lesson>>("lessons", []);
    const [currentTab, setCurrentTab] = useState("lessons");

    const getAllPairs = () => {
        let pairs: Array<WordsPair> = []
        lessonsList.forEach(lesson => {
            lesson.questions.forEach(question => {
                if (question.type == QUESTION_TYPES.SYNONYMS_OPPOSITES) {
                    let questionData = question as QuestionDataSynonyms
                    pairs.push(...questionData.pairs)
                }
            });
        });
        return pairs
    }

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
                    <WordsTab pairs={getAllPairs()}/>
                </Tab>

            </Tabs>
            <br />
        </div >
    );
}