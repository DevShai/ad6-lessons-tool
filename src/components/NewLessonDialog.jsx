import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function NewLessonDialog() {
  const [show, setShow] = useState(false);

  const toggle = () => {setShow(!show)}

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>שיעור חדש</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
      </Modal>
    </>
  );
}

render(<Example />);