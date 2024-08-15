import React, { useState, useEffect } from 'react';
import './TaskForm.css';

function TaskForm({ initialData, onSubmitComplete }) {
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(getCurrentDate());

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setDueDate(initialData.dueDate || getCurrentDate());
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Le nom de la tâche est requis.');
      return;
    }

    const task = {
      id: initialData ? initialData.id : Date.now(),
      name,
      description,
      dueDate,
      completed: initialData ? initialData.completed : false,
    };

    onSubmitComplete(task); 

    setName('');
    setDescription('');
    setDueDate(getCurrentDate());
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label>Nom de la tâche</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Date d'échéance</label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button type="submit" className="toggle-button">
        {initialData ? 'Mettre à jour' : 'Ajouter'}
      </button>
    </form>
  );
}

export default TaskForm;
