import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import LiveTask from './LiveTask'

const Live = ({ tasks }) => (
  <StyledTask>
    {tasks.map((task) => (
      <LiveTask key={task.id} task={task} />
    ))}
  </StyledTask>
)

Live.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({})),
}

const StyledTask = styled.div`
  height: 100vh;
  color: white;
  padding: 10px;
  font-size: 21px;
  font-weight: 600;
  line-height: 25px;
`

export default Live
