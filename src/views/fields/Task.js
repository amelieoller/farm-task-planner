import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { ReactComponent as DragIcon } from '../../assets/icons/menu.svg'

const ItemTypes = {
  CARD: 'card',
}

const Task = ({ task, index, moveCard }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performanceTaskNew
      // to avoid expensive index searches.

      /* eslint-disable no-param-reassign */
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.CARD, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  const handleTaskTitleChange = () => {}

  return (
    <StyledTask ref={preview} style={{ opacity }}>
      <span className="drag-handle" ref={ref}>
        <DragIcon />
      </span>

      <div className="content">
        <input value={task.title} onChange={handleTaskTitleChange}></input>
        <span>{task.isDependent && 'isDependent'}</span>
      </div>
    </StyledTask>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    isDependent: PropTypes.bool,
  }),
  index: PropTypes.number,
  moveCard: PropTypes.func,
}

const StyledTask = styled.div`
  border: 1px dashed gray;
  padding: 0.2rem 1rem;
  margin-bottom: 0.5rem;
  background-color: white;
  display: flex;
  align-items: center;

  .drag-handle {
    cursor: move;
    margin-right: 1rem;
    display: flex;

    svg {
      width: 24px;
      color: #999999;

      &:hover,
      &:focus {
        color: #333;
      }
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    input {
      border: none;
      font-size: 17px;
      padding: 4px 0;
    }
  }
`

export default Task
