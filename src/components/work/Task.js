import { useState, useRef } from "react";
import { Button, Card, Modal, Form, Alert } from "react-bootstrap";
import { db } from "../../firebase.js";
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import "bootstrap/dist/css/bootstrap.min.css";


const Task = (props) => {
  const [modal, setModal] = useState(false); // for showing edit form modal
  const [error, setError] = useState(""); // for tracking error errors
  const taskRef = useRef();
  const [items, todo] = [props.listItems, props.task];

  const stringID = todo.id.toString();

  /* Checkbox click handler */
  const handleCheckChange = (e) => {
    e.preventDefault();
    db.collection("todos")
      .doc(stringID)
      .set({ done: !todo.done }, { merge: true });
  };

  /* Delete button click handler */
  const handleDeleteButton = (e) => {
    e.preventDefault();
    db.collection("todos").doc(stringID).delete();
  };

  /* Edit button click handler */
  const handleEditButton = (e) => {
    e.preventDefault();
    setModal(true);
  };

  /* Cancel button click handler */
  const handleCancelButton = (e) => {
    e.preventDefault();
    setModal(false);
    setError("");
  };

  /* Valid duplicates and updates the correct task */
  const handleUpdateButton = (e) => {
    e.preventDefault();
    const lowercase = taskRef.current.value.toLowerCase();

    for (let i = 0; i < items.length; i++) {
      if (
        items[i].text.toLowerCase() === lowercase &&
        items[i].id !== todo.id
      ) {
        setError("Duplicate task detected (case-insensitive). Try again.");
        return false;
      }
    }

    setModal(false);
    setError("");
    db.collection("todos")
      .doc(stringID)
      .set({ text: taskRef.current.value }, { merge: true });
  };

  return (
    <div className="mb-5">
      <Card>
        <Card.Body>
          <div className="d-flex align-items-center custom-control custom-checkbox">
            <input
              type="checkbox"
              className="me-2 custom-control-input"
              id="defaultUnchecked"
              checked={props.task.done}
              onChange={handleCheckChange}
            />
            <Card.Text>{props.task.text}</Card.Text>
          </div>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-flex-end">
          <Button onClick={handleEditButton} className="me-3"><FiEdit3 /></Button>
          <Button onClick={handleDeleteButton}><AiOutlineDelete /></Button>
        </Card.Footer>
      </Card>

      <Modal show={modal}>
        <Modal.Body>
          <Form className="edit-form">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" id="todo-form-desc">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                className="edit-input"
                type="text"
                defaultValue={todo.text}
                ref={taskRef}
              />
            </Form.Group>
            <div>
              <Button type="submit" onClick={handleUpdateButton} className="me-3">
                UPDATE
              </Button>
              <Button onClick={handleCancelButton}>CANCEL</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Task;
