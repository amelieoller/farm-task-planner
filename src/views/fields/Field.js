import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import PropTypes from 'prop-types'

import Task from './Task'
import updateField from '../../actions/updateField'

const Field = ({ field }) => {
  const [tasks, setTasks] = useState(field.tasks)

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = tasks[dragIndex]
      const newTasks = update(tasks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })

      updateField(field.id, { ...field, tasks: newTasks })
      setTasks(newTasks)
    },
    [tasks],
  )

  return (
    <>
      <div>
        {tasks.map((task, i) => (
          <Task key={task.id} index={i} task={task} moveCard={moveCard} />
        ))}
      </div>
    </>
  )
}

Field.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string,
    tasks: PropTypes.string,
  }),
}

export default Field
