import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import LessonForm from "./LessonForm.tsx"

export default function EditLesson(props) {

    const [lessonData, setLessonData] = useState({})

    useEffect(() => {
        if (props.lessonData) {
            setLessonData(props.lessonData)
        }
    }, [props.lessonData])

    const onSubmit = function(newData) {
        props.updateLesson(props.lessonIdx, newData)
    }

    return (
        <Container fluid style={{padding: "1rem"}}>
            <LessonForm
                lessonData={lessonData} 
                onSubmit={onSubmit}
                showQuestions={true}/>
        </Container>
    )
}