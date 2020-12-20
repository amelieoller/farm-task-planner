// This is an uncontrolled React form, which is way simpler than
// the normal React controlled form
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can use browser form validation these days, and just
// get the values from the form on submit.

import React, { useState } from "react";
import styled from "styled-components";

import {
  FormRow,
  FormLabel,
  TextInput,
  Checkbox,
  Button,
} from "../../styles/forms";

const TaskNew = ({ onSubmit, task }) => {
  const [title, setTitle] = useState((task && task.title) || "");
  const [isDependent, setIsDependent] = useState(
    (task && task.isDependent) || false
  );
  const [hasChanged, setHasChanged] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...task,
      title: title,
      isDependent: isDependent,
      status: "not started",
    });

    setHasChanged(false);
  };

  const handleChange = (cb) => {
    cb();
    setHasChanged(true);
  };

  return (
    <StyledTaskNew>
      <FormRow style={{ width: "100%" }}>
        <FormLabel htmlFor="title">Task Title</FormLabel>
        <TextInput
          type="text"
          name="title"
          value={title}
          onChange={(e) => handleChange(() => setTitle(e.target.value))}
        />
      </FormRow>

      <FormRow style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          type="checkbox"
          name="isDependent"
          checked={isDependent}
          onChange={(e) => handleChange(() => setIsDependent(e.target.checked))}
        />
        <FormLabel htmlFor="isDependent">Is Dependent</FormLabel>
      </FormRow>

      {hasChanged && (
        <div style={{ margin: "0 auto" }}>
          <Button onClick={handleSubmit}>Save task</Button>
        </div>
      )}
    </StyledTaskNew>
  );
};

const StyledTaskNew = styled.div`
  display: grid;
  grid-template-columns: auto 120px 120px;
  width: 100%;
  align-items: center;
  grid-gap: 10px;
`;

export default TaskNew;
