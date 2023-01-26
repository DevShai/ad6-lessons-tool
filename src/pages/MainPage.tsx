import LessonsList from 'src/components/lessons/LessonsList';
import NewLessonDialog from 'src/components/lessons/NewLessonDialog';
import { Button, Container, Form, FormLabel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import EditLesson from '../components/lessons/EditLesson';
import 'src/assets/styles/MainPage.css'
import React from 'react';

export default function MainPage() {

    const [modalVisible, setModalVisible] = useState(false);
    const [lessonsList, setLessonsList] = useState([])
    const [editedLessonIdx, setEditedLessonIdx] = useState(-1)

    const retrieveLessons = function () {
        try {
            var list = JSON.parse(localStorage.getItem("lessons"))
            if (list != null) {
                return list
            } else {
                return []
            }

        } catch (_e) {
            return []
        }
    }

    useEffect(() => {
        setLessonsList(retrieveLessons())
    }, [])

    const saveLessons = function (lessons, showNotification = false) {
        var seen = [];
        localStorage.setItem("lessons",
            JSON.stringify(lessons, function (key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }))
        if (showNotification) {
            alert("השיעור נשמר")
        }
    }

    const addNewLesson = function (lessonData) {
        var newList = [...lessonsList]
        newList.push(lessonData)
        setLessonsList(newList)
        saveLessons(newList, false)
        setEditedLessonIdx(newList.length - 1)
    }

    const deleteLesson = function (idx) {
        if (window.confirm(`למחוק את השיעור ${lessonsList[idx].lesson_name} ואת כל השאלות שבו?`)) {
            var newList = [...lessonsList]
            newList.splice(idx, 1)
            setLessonsList(newList)
            saveLessons(newList, false)
            setEditedLessonIdx(-1)
        }
    }

    const updateLesson = function (idx, newData) {
        var newList = [...lessonsList]
        newList[idx] = newData
        setLessonsList(newList)
        saveLessons(newList, true)
    }

    const download = function (content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
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

    return (
        <div className="MainPage">
            <Container>
                <h1>כלי ניהול שיעורים</h1>
                <NewLessonDialog
                    visible={modalVisible}
                    onHide={() => setModalVisible(false)}
                    saveLesson={addNewLesson}
                    deleteLesson={deleteLesson} />

                <LessonsList
                    lessons={lessonsList}
                    deleteLesson={deleteLesson}
                    editLesson={setEditedLessonIdx}
                    exportLesson={exportLesson} />
            </Container>
            <br />
            <Container style={{ gap: "1rem", display: "inline-flex", justifyContent: "center" }}>
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

            <br /><hr /><br />
            {getLessonEditor()}

        </div>
    );
}