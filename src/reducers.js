// src/reducers.js

import { combineReducers } from 'redux';
import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK_COMPLETION
} from './actions';

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case EDIT_TASK:
      return state.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
    case DELETE_TASK:
      return state.filter(task => task.id !== action.payload);
    case TOGGLE_TASK_COMPLETION:
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;
