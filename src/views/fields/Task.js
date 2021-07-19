import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { ReactComponent as DragIcon } from '../../assets/icons/menu.svg'
import { ReactComponent as MinusSquareIcon } from '../../assets/icons/minus-square.svg'
import { ReactComponent as CheckSquareIcon } from '../../assets/icons/check-square.svg'
import { ReactComponent as SquareIcon } from '../../assets/icons/square.svg'

const ItemTypes = {
  CARD: 'card',
}

const Task = ({ task, index, moveCard, onTaskSave, onDeleteTask }) => {
  const [title, setTitle] = useState((task && task.title) || '')
  const [isDependent, setIsDependent] = useState(
    (task && task.isDependent) || false,
  )

  const handleCheck = () => {
    const newIsDependent = !isDependent

    setIsDependent(newIsDependent)
    handleTaskSave(newIsDependent, false)
  }

  const handleTaskInputKeydown = () => {
    handleTaskSave(isDependent, true)
  }

  const handleTaskSave = (
    newIsDependent = isDependent,
    createNewField = false,
  ) => {
    const newTask = {
      ...task,
      title,
      isDependent: newIsDependent,
      status: task.status || 'not started',
    }

    onTaskSave(newTask, createNewField)
  }

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

  const handleDeleteTask = () => {
    onDeleteTask(task)
  }

  return (
    <StyledTask ref={preview} style={{ opacity }}>
      <span className="drag-handle" ref={ref}>
        <DragIcon />
      </span>
      <div className="content">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleTaskSave(isDependent, false)}
          onKeyDown={(e) => e.key === 'Enter' && handleTaskInputKeydown()}
          autoFocus
        ></input>
        <div>
          <span
            role="button"
            tabIndex={0}
            onKeyDown={handleCheck}
            onClick={handleCheck}
          >
            {isDependent ? <CheckSquareIcon /> : <SquareIcon />}
          </span>
          <MinusSquareIcon
            onClick={() =>
              // eslint-disable-next-line no-alert
              window.confirm('Are you sure you want to remove this task?') &&
              handleDeleteTask()
            }
          />
        </div>
      </div>
    </StyledTask>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    isDependent: PropTypes.bool,
    status: PropTypes.string,
  }),
  index: PropTypes.number,
  moveCard: PropTypes.func,
  onTaskSave: PropTypes.func,
  onDeleteTask: PropTypes.func,
}

const StyledTask = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 6px 15px;
  margin-bottom: 6px;
  background-color: white;
  display: flex;
  align-items: center;

  .drag-handle {
    cursor: move;
    margin-right: 1rem;
    display: flex;
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
