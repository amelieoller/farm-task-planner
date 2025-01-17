import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Backstage from './Backstage'
import Live from './Live'

const Steam = ({ fields }) => {
  const [tasksToDisplay, setTasksToDisplay] = useState([])

  useEffect(() => {
    const displayTasks = []

    const newFields = fields.sort((fieldA, fieldB) => {
      const aHasRunningTask = fieldA.isRunning
      const bHasRunningTask = fieldB.isRunning

      return !!bHasRunningTask - !!aHasRunningTask
    })

    for (let i = 0; i < newFields.length; i += 1) {
      const field = newFields[i]
      const { tasks } = field

      for (let j = 0; j < tasks.length; j += 1) {
        const task = tasks[j]

        // If current task is completed, skip over it (continue)
        if (task.status !== 'completed') {
          displayTasks.push({ ...task, field })

          // If current task is not started, push it and break
          if (task.status === 'not started' || !tasks[j + 1]?.isDependent) break
        }
      }
    }

    setTasksToDisplay(displayTasks)
  }, [fields])

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
  )
}

Steam.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      tasks: PropTypes.arrayOf(
        PropTypes.shape({
          status: PropTypes.string,
          isDependent: PropTypes.bool,
        }),
      ),
    }),
  ),
}

export default Steam
