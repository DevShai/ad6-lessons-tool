import React from 'react';
import { Button, Card } from 'react-bootstrap';

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
}

export default function LessonCard(props) {
  return (

    <Card style={{ width: '18rem' }}>
      <Card.Body style={cardStyle}>
        <Card.Title>{props.lesson_name}</Card.Title>
        <Button onClick={props.editLesson}>עריכה</Button>
        <Button onClick={props.exportLesson}>ייצוא</Button>
        <Button variant='danger' onClick={props.deleteLesson}>מחיקה</Button>
      </Card.Body>
    </Card>

  );
}