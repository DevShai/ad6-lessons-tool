import LessonsList from 'src/components/lessons/LessonsList';
import NewLessonDialog from 'src/components/lessons/NewLessonDialog';
import { Button, Container, Form, FormLabel } from 'react-bootstrap';
import { useState } from 'react';
import EditLesson from '../components/lessons/EditLesson';
import 'src/assets/styles/MainPage.css'
import React from 'react';
import { download } from 'src/types/datatypes';

export default function LessonsTab({lessonsList, setLessonsList}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [editedLessonIdx, setEditedLessonIdx] = useState(-1);

    const addNewLesson = function (lessonData) {
        var newList = [...lessonsList]
        newList.push(lessonData)
        setLessonsList(newList)
        setEditedLessonIdx(newList.length - 1)
    }

    const deleteLesson = function (idx) {
        if (window.confirm(`למחוק את השיעור ${lessonsList[idx].lesson_name} ואת כל השאלות שבו?`)) {
            var newList = [...lessonsList]
            newList.splice(idx, 1)
            setLessonsList(newList)
            setEditedLessonIdx(-1)
        }
    }

    const updateLesson = function (idx, newData) {
        var newList = [...lessonsList]
        newList[idx] = newData
        setLessonsList(newList)
    }

    const exportLesson = function (idx) {
        var data = lessonsList[idx]
        download(JSON.stringify(data, undefined, '\t'), data.lesson_name + ".json", "text/plain");
    }

    const getLessonEditor = function () {
        if (editedLessonIdx < 0) {
            return ""
        } else {
            return <EditLesson
                lessonData={lessonsList[editedLessonIdx]}
                lessonIdx={editedLessonIdx}
                updateLesson={updateLesson} />
        }
    }

    const importLesson = function (file: File) {

        const onReaderLoad = (e) => {
            var obj = JSON.parse(e.target.result)
            addNewLesson(obj)
        }

        var reader = new FileReader()
        reader.onload = onReaderLoad
        reader.readAsText(file)
    }

    return <Container>
        <NewLessonDialog
            visible={modalVisible}
            onHide={() => setModalVisible(false)}
            saveLesson={addNewLesson}
            deleteLesson={deleteLesson} />
        <Container style={{ gap: "1rem", display: "inline-flex", justifyContent: "center", padding: "1rem" }}>
            <Button
                onClick={() => setModalVisible(true)}>יצירת שיעור חדש</Button>
            <Form.Control
                type={"file"}
                id={"importLessonBtn"}
                accept="application/json"
                onChange={(e) => importLesson((e.target as HTMLInputElement).files[0])}
                hidden />
            <Button
                as={FormLabel as any}
                for="importLessonBtn"
                style={{ marginBottom: 0 }}>ייבוא שיעור מקובץ</Button>

        </Container>
        <LessonsList
            lessons={lessonsList}
            deleteLesson={deleteLesson}
            editLesson={setEditedLessonIdx}
            exportLesson={exportLesson} />
        {getLessonEditor()}
    </Container>
}