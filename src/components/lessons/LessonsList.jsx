import React from "react";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LessonCard from "./LessonCard";

export default function LessonsList(props) {
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        if (props.lessons) {
            setLessons(props.lessons)
        }
    }, [props.lessons])

    return (
        <Container fluid className="lessons-list">
            {lessons.map((value, idx) =>
                <LessonCard
                    lesson_name={value.lesson_name}
                    key={idx}
                    deleteLesson={() => props.deleteLesson(idx)}
                    editLesson={() => props.editLesson(idx)}
                    exportLesson={() => props.exportLesson(idx)}
                />
            )}
        </Container>
    )
}