// This is an uncontrolled React form, which is way simpler than
// the normal React controlled form
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can use browser form validation these days, and just
// get the values from the form on submit.

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { FormRow, FormLabel, TextInput, Button } from '../../styles/forms'
import TaskNew from './TaskNew'
import { ReactComponent as PlusCircleIcon } from '../../assets/icons/plus-circle.svg'

const FieldForm = ({ onSubmit, field }) => {
  const [title, setTitle] = useState((field && field.title) || '')
  const [tasks, setTasks] = useState((field && field.tasks) || [])

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({
      title,
      tasks,
      lastWorkDone: new Date(),
    })
  }

  const onTaskSave = (task) => {
    setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? task : t)))
  }

  return (
    <>
      <h1>Create A New Field</h1>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormLabel htmlFor="title">Field Title</FormLabel>
          <TextInput
            type="text"
            name="Field Title"
            placeholder="Field Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormRow>

        <h2>Tasks</h2>
        {tasks.map((task) => (
          <TaskNew key={task.id} task={task} onSubmit={onTaskSave} />
        ))}

        <PlusCircleIcon
          onClick={() =>
            setTasks((prevTasks) => [...prevTasks, { id: tasks.length }])
          }
        />

        <hr />
        <Button type="submit">Save field</Button>
      </form>
    </>
  )
}

FieldForm.propTypes = {
  field: PropTypes.shape({
    title: PropTypes.string,
    tasks: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
}

export default FieldForm
