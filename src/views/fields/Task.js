// This is an uncontrolled React form, which is way simpler than
// the normal React controlled form
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can use browser form validation these days, and just
// get the values from the form on submit.

import React, { useState } from "react";

import { FormRow, FormLabel, TextInput, Checkbox } from "../../styles/forms";

const Task = ({ onSubmit, task }) => {
  const [title, setTitle] = useState((task && task.title) || "");
  const [isDependent, setIsDependent] = useState(
    (task && task.isDependent) || false
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ ...task, title: title, isDependent: isDependent });
  };

  return (
    <div>
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

      <FormRow>
        <Checkbox
          type="checkbox"
          name="isDependent"
          checked={isDependent}
          onChange={(e) => setIsDependent(e.target.checked)}
        />
        <FormLabel htmlFor="isDependent">Is Dependent</FormLabel>
      </FormRow>

      <button onClick={handleSubmit}>Save task</button>
    </div>
  );
};

export default Task;
