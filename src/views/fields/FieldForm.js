// This is an uncontrolled React form, which is way simpler than
// the normal React controlled form
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can use browser form validation these days, and just
// get the values from the form on submit.

import React, { useState } from "react";

import { FormRow, FormLabel, TextInput, Checkbox } from "../../styles/forms";
import Task from "./Task";

const FieldForm = ({ onSubmit, field }) => {
  const [title, setTitle] = useState((field && field.title) || "");
  const [tasks, setTasks] = useState((field && field.tasks) || []);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title: title,
      tasks: tasks,
    });
  };

  const onTaskSave = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? task : t))
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormRow>
        <FormLabel htmlFor="title">Title</FormLabel>
        <TextInput
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormRow>

      <h2>Tasks</h2>
      {tasks.map((task, i) => (
        <Task key={i} task={task} onSubmit={onTaskSave} />
      ))}

      <button
        type="submit"
        onClick={() =>
          setTasks((prevTasks) => [...prevTasks, { id: tasks.length }])
        }
      >
        Add task
      </button>

      <button type="submit">Save field</button>
    </form>
  );
};

export default FieldForm;
