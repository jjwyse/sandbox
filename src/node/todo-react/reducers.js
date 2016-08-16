'use strict';
import { combineReducers } from 'redux'

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('Adding todo...');
      return [
        ...state, {
          text: action.text,
          id: action.id
        }
      ]
  }
  console.log('hit default return state');
  return state;
}

const rootReducer = combineReducers({ todos: todosReducer });

export default rootReducer;
