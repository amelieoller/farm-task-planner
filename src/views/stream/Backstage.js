import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import BackstageTask from './BackstageTask'

const Backstage = ({ tasks }) => (
  <StyledTask>
    {/* {fields.map((field) =>
      field.tasks.map((task, i) => (
        <BackstageTask key={i} task={task} field={field} />
      ))
    )} */}

    {tasks.map((task) => (
      <BackstageTask
        key={task.id + task.field.id}
        task={task}
        field={task.field}
      />
    ))}
  </StyledTask>
)

Backstage.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({})),
}

const StyledTask = styled.div`
  height: 100vh;
  padding: 10px;
  font-size: 21px;
  font-weight: 600;
  line-height: 25px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export default Backstage
