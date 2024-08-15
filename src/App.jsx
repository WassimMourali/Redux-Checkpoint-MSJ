import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import StoreDebug from './components/StoreDebug';
import {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion
} from './actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const [taskToEdit, setTaskToEdit] = React.useState(null);

  React.useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => dispatch(addTask(task)));
  }, [dispatch]);

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    if (task.name.trim()) {
      dispatch(addTask({ ...task, id: Date.now(), completed: false }));
    } else {
      alert('Le nom de la tâche ne peut pas être vide.');
    }
  };

  const handleEditTask = (editedTask) => {
    dispatch(editTask(editedTask));
    setTaskToEdit(null);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleCompleteTask = (id) => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>To-Do List</h1>
      </header>
      <main>
        <TaskForm
          onSubmitComplete={taskToEdit ? handleEditTask : handleAddTask}
          initialData={taskToEdit}
        />
        <TaskList
          tasks={tasks}
          onEdit={handleEditClick}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
        />
      </main>
      <StoreDebug />
    </div>
  );
}

export default App;
