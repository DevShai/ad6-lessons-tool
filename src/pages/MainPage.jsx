import LessonsList from '../components/LessonsList';
import NewLessonDialog from '../components/NewLessonDialog';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';


export default function MainPage() {

    const [modalVisible, setModalVisible] = useState(false);
    const [lessonsList, setLessonsList] = useState([])

    const retrieveLessons = function () {
        try {
            var list = JSON.parse(localStorage.getItem("lessons"))
            return list
        } catch(_e) {
            return []
        }
    }

    const saveLessons = function (lessons) {
        localStorage.setItem("lessons", JSON.stringify(lessons))
    }

    const addNewLesson = function (lessonData) {
        var newList = [...lessonsList]
        newList.push(lessonData)
        setLessonsList(newList)
    }

    useEffect(() => {
        if (lessonsList.length != 0) {
            saveLessons(lessonsList)
        }
    }, [lessonsList])

    useEffect(() => {
        setLessonsList(retrieveLessons())
    }, [])

    return (
        <div className="MainPage">
            <h1>Ad6 Admin Tool</h1>

            <LessonsList lessons={lessonsList} />

            <Button onClick={() => setModalVisible(true)}>יצירת שיעור חדש</Button>

            <NewLessonDialog
                visible={modalVisible}
                onHide={() => setModalVisible(false)}
                saveLesson={addNewLesson} />

        </div>
    );
}