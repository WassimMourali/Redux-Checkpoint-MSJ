import React from 'react';
import { useSelector } from 'react-redux';
import './StoreDebug.css';

function StoreDebug() {
  const tasks = useSelector(state => state.tasks);

  return (
    <div className="store-debug">
      <h2>État du Store</h2>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}

export default StoreDebug;
