import React from "react";
import { Container, Form, Table } from "react-bootstrap";
import TextWithAudioField from "src/components/fields/TextWithAudioField";
import { Lesson, QUESTION_TYPES, Question, QuestionDataDrawLine, QuestionDataMaleFemale, QuestionDataReadText, WORD_GENDER, WordData } from "src/types/datatypes";

const getQuestionWords = function (question: Question) {
    let words: Array<WordData> = []
    if (question.type == QUESTION_TYPES.MALE_FEMALE) {
        let q = question as QuestionDataMaleFemale
        q.female_words.forEach(element => {
            words.push({ "word": { "text": element }, "gender": WORD_GENDER.F })
        });
        q.male_words.forEach(element => {
            words.push({ "word": { "text": element }, "gender": WORD_GENDER.M })
        });
    }
    else if (question.type == QUESTION_TYPES.LINE_DRAW) {
        let q = question as QuestionDataDrawLine
        words.push(...q.words)
    }
    else if (question.type == QUESTION_TYPES.TEXT_WITH_QUIZ) {
        let q = question as QuestionDataReadText
        words.push(...q.definitions)
    }

    return words
}

const getWords = function (lessons: Array<Lesson>): Array<WordData> {
    var words: Array<WordData> = []
    lessons.forEach(lesson => {
        lesson.questions.forEach(question => {
            words.push(...getQuestionWords(question))
        });
    });
    return words
}

const tableBody = function (words: Array<WordData>) {
    return <tbody>
        {words.map((value, idx) => <tr>
            <td>
                {idx}
            </td>
            <td>
                <TextWithAudioField
                    wordData={value.word}
                    idx={idx}
                    isAudioValid={value.word.audio != null}
                />
            </td>
            <td>
                <TextWithAudioField
                    wordData={value.definition ? value.definition : {"audio": null, "text": ""}}
                    idx={idx}
                    isAudioValid={value.definition != null && value.definition.audio != null}

                />
            </td>
        </tr>)}
    </tbody>
}

export default function WordsTab({ lessons }) {
    return <Container fluid>
        <Table striped bordered hover size="max" style={{ alignSelf: "center" }}>
            <thead>
                <tr>
                    <th >#</th>
                    <th>מילה</th>
                    <th>הגדרה</th>
                </tr>
            </thead>
            {tableBody(getWords(lessons))}
        </Table>
    </Container>
}