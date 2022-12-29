import LessonsList from '../components/LessonsList';
import NewLessonDialog from '../components/NewLessonDialog';
import { Button } from 'react-bootstrap';
import { useState } from 'react';


export default function MainPage() {
    
    const [modalVisible, setModalVisible] = useState(false);

  
    return (
    <div className="MainPage">
      <h1>Ad6 Admin Tool</h1>

      <LessonsList lessons={["a", "b"]}/>
      
      <Button onClick={() => setModalVisible(true)}>יצירת שיעור חדש</Button>

      <NewLessonDialog visible={modalVisible} onHide={() => setModalVisible(false)}/>

    </div>
  );
}