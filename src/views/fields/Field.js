import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import PropTypes from 'prop-types'

import Task from './Task'
import updateField from '../../actions/updateField'
import deleteField from '../../actions/deleteField'
import { Button } from '../../styles/forms'
import { ReactComponent as PlusSquareIcon } from '../../assets/icons/plus-square.svg'

const Field = ({ field, history }) => {
  const [tasks, setTasks] = useState(field.tasks)
  const [title, setTitle] = useState((field && field.title) || '')

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

  const onTaskSave = (task, addTask) => {
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t))

    if (addTask) {
      newTasks = [...newTasks, { id: tasks.length }]
    }

    setTasks(newTasks)
  }

  const handleFieldSave = () => {
    const newField = {
      title,
      tasks,
      lastWorkDone: Date.now(),
    }

    updateField(field.id, newField)

    history.push('/')
  }

  const onDeleteTask = (task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id))
  }

  return (
    <>
      <input
        className="field-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div>
        {tasks.map((task, i) => (
          <Task
            key={task.id}
            index={i}
            task={task}
            moveCard={moveCard}
            onTaskSave={onTaskSave}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>

      <div>
        <PlusSquareIcon
          onClick={() =>
            setTasks((prevTasks) => [...prevTasks, { id: tasks.length }])
          }
        />
      </div>

      <Button onClick={handleFieldSave} style={{ marginRight: '10px' }}>
        Save All Tasks
      </Button>

      <Button
        onClick={() =>
          // eslint-disable-next-line no-alert
          window.confirm('Are you sure you want to delete this field?') &&
          deleteField(field).then(() => history.push(`/`))
        }
        className="delete"
      >
        Delete Field
      </Button>
    </>
  )
}

Field.propTypes = {
  field: PropTypes.shape({
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}

export default Field
