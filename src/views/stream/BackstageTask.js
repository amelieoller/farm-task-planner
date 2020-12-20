import React from "react";
import styled from "styled-components";
import updateField from "../../actions/updateField";

import { ReactComponent as CircleIcon } from "../../assets/icons/circle.svg";
import { ReactComponent as PlayCircleIcon } from "../../assets/icons/play-circle.svg";
import { ReactComponent as XCircleIcon } from "../../assets/icons/x-circle.svg";

const Task = ({ task, field }) => {
  const renderIcon = (status) => {
    switch (status) {
      case "running":
        return <PlayCircleIcon />;
      case "completed":
        return <XCircleIcon />;
      default:
        return <CircleIcon />;
    }
  };

  const handleTaskClick = () => {
    // update state from either running -> completed OR not started -> running
    const newStatus = task.status === "running" ? "completed" : "running";
    let lastWorkDone = field.lastWorkDone || new Date();

    let resetAll = false;
    const newTasks = field.tasks.map((t, i) => {
      if (t.id === task.id) {
        if (newStatus === "completed") {
          if (field.tasks[i + 1] && !field.tasks[i + 1].isDependent) {
            lastWorkDone = new Date();
          }

          // If there is no next task, reset all tasks
          if (!field.tasks[i + 1]) {
            resetAll = true;
          }
        }

        return { ...t, status: newStatus };
      } else {
        return t;
      }
    });

    if (resetAll) {
      const tasks = field.tasks.map((t) => ({ ...t, status: "not started" }));
      updateField(field.id, { ...field, tasks });
    } else {
      updateField(field.id, {
        ...field,
        lastWorkDone,
        tasks: newTasks,
      });
    }
  };

  return (
    <StyledTask onClick={handleTaskClick}>
      {renderIcon(task.status)}
      {field.title} - {task.title}
    </StyledTask>
  );
};

const StyledTask = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  cursor: pointer;
  background: lightgray;

  &:hover {
    background: gray;
  }

  svg {
    margin-right: 8px;
    width: 23px;
  }
`;

export default Task;
