import React from 'react'
import styled from 'styled-components'

import LiveTask from './LiveTask'

const Live = ({ tasks }) => (
  <StyledTask>
    {tasks.map((task, i) => (
      <LiveTask key={i} task={task} />
    ))}
  </StyledTask>
)

const StyledTask = styled.div`
  height: 100vh;
  color: white;
  padding: 10px;
  font-size: 21px;
  font-weight: 600;
  line-height: 25px;
`

export default Live
