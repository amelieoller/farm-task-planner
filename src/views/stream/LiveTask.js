import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { ReactComponent as CircleIcon } from '../../assets/icons/circle.svg'
import { ReactComponent as PlayCircleIcon } from '../../assets/icons/play-circle.svg'

const Task = ({ task }) => {
  const renderIcon = (status) => {
    switch (status) {
      case 'running':
        return <PlayCircleIcon />
      default:
        return <CircleIcon />
    }
  }

  return (
    <StyledTask>
      {renderIcon(task.status)}
      {task.field.title} - {task.title}
    </StyledTask>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    status: PropTypes.string,
    field: PropTypes.string,
    title: PropTypes.string,
  }),
}

const StyledTask = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    width: 23px;
    height: 23px;
  }
`

export default Task
