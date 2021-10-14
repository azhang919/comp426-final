import { useState, useEffect } from "react";
import TaskForm from "./TaskForm.js";
import Task from "./Task.js";
import { db } from "../../firebase.js";

const TaskList = (props) => {
  const [items, setItems] = useState([]);
  const uid = props.uid;

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setItems(
          snapshot.docs
            .filter((doc) => doc.data().uid === uid)
            .map((d) => d.data())
        );
      });
  }, []);

  /**
   * Validates duplicates and updates list when a new task is submitted
   * @param {Object} task
   * @returns true if the task was successfully added, false otherwise
   */
  const addItem = (task) => {
    if (duplicateExists(task)) {
      return false;
    }
    db.collection("todos").doc(task.id.toString()).set(task);
    return true;
  };

  /**
   * Checks a task against an existing list of tasks
   * @param {Object} task
   * @returns true if a duplicate exists, false otherwise
   */
  const duplicateExists = (task) => {
    let lowercase = task.text.toLowerCase();
    for (let i = 0; i < items.length; i++) {
      if (items[i].text.toLowerCase() === lowercase) {
        return true;
      }
    }
    return false;
  };

  return (
    <section className="work">
      <TaskForm handleSubmit={addItem} uid={props.uid} />
      {items.map((t, i) => (
        <Task key={i} task={t} listItems={items}/>
      ))}
    </section>
  );
};

export default TaskList;
