import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import updateField from "../../actions/updateField";
import Backstage from "./Backstage";
import Live from "./Live";

const Steam = ({ fields }) => {
  const [tasksToDisplay, setTasksToDisplay] = useState([]);

  useEffect(() => {
    const displayTasks = [];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const tasks = field.tasks;
      // const { tasks, ...field } = fields[i];

      for (let j = 0; j < tasks.length; j++) {
        const task = tasks[j];

        // If current task is completed, skip over it (continue)
        if (task.status !== "completed") {
          displayTasks.push({ ...task, field });

          // If current task is not started, push it and break
          if (task.status === "not started") break;
        }
      }
    }

    // // Reset all tasks if they're all completed
    // if (!displayTasks.length) {
    //   for (let i = 0; i < fields.length; i++) {
    //     const field = fields[i];
    //     const tasks = field.tasks.map((t) => ({ ...t, status: "not started" }));

    //     updateField(field.id, { ...field, tasks });
    //   }
    // } else {
    setTasksToDisplay(displayTasks);
    // }
  }, [fields]);

  return (
    <Switch>
      <Route
        path="/stream/live"
        render={() => <Live tasks={tasksToDisplay} />}
      />
      <Route
        path="/stream/backstage"
        render={() => <Backstage tasks={tasksToDisplay} />}
      />
    </Switch>
  );
};

export default Steam;
