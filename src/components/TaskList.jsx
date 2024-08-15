import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ onEdit }) {
  const tasks = useSelector(state => state.tasks);

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} />
      ))}
    </ul>
  );
}

export default TaskList;
