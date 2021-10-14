import { useState, useRef } from "react";
import firebase from "firebase";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskForm = (props) => {
  const [error, setError] = useState("");
  const taskRef = useRef();
  const { uid, handleSubmit } = props;

  const handleSubmitButton = (e) => {
    e.preventDefault();

    if (!taskRef.current.value) {
      setError("Blank description.");
      return;
    } else if (taskRef.current.value.length > 75) {
      setError("Description is too long (over 75 characters).");
      return;
    }

    const newTask = {
      id: new Date().getTime(), // ensures unique ID
      uid: uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: taskRef.current.value,
      done: false,
    };

    if (handleSubmit(newTask)) {
      setError("");
      taskRef.current.value = "";
    } else {
      setError("Duplicate task detected (case-insensitive). Try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmitButton} style={{ textAlign: "left" }}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mt-5 mb-5" id="todo-form-desc">
        <Form.Label><strong>Create New Task</strong></Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control
            className="me-3"
            type="text"
            placeholder="Text here..."
            ref={taskRef}
            style={{ width: "95%" }}
          />
          <Button type="submit">+</Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default TaskForm;
