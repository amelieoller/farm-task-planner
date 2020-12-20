import React from "react";
import styled from "styled-components";

import BackstageTask from "./BackstageTask";

const Backstage = ({ tasks }) => (
  <StyledTask>
    {/* {fields.map((field) =>
      field.tasks.map((task, i) => (
        <BackstageTask key={i} task={task} field={field} />
      ))
    )} */}

    {tasks.map((task, i) => (
      <BackstageTask key={i} task={task} field={task.field} />
    ))}
  </StyledTask>
);

const StyledTask = styled.div`
  height: 100vh;
  padding: 10px;
  font-size: 21px;
  font-weight: 600;
  line-height: 25px;
`;

export default Backstage;
