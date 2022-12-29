import React from 'react';
import { Card } from 'react-bootstrap';

export default function LessonCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.lesson_name}</Card.Title>
        <Card.Link href="#">עריכה</Card.Link> <br/>
        <Card.Link href="#">צפייה</Card.Link>
      </Card.Body>
    </Card>
  );
}