import React from 'react'
import styled from 'styled-components'

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

const StyledTask = styled.div`
  padding: 5px 10px;
  display: flex;

  svg {
    margin-right: 8px;
    width: 23px;
  }
`

export default Task
