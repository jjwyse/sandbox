import { combineReducers } from 'redux';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        id: state.id,
        text: state.text,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('adding todo');
      return [
        ...state,
        todo(null, action)
      ];
    case 'TOGGLE_TODO':
      console.log(`toggling todo for ${JSON.stringify(action)}`);
      return state.map(t => todo(t, action));
    default:
      console.log('hit default return state in todosReducer');
      return state;
  }
};

const visibilityReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      console.log(`setting visibility filter to ${action.filter}`);
      return action.filter;
    default:
      console.log('hit default return state in visibilityReducer');
      return state;
  }
};

export default combineReducers({ todos: todosReducer, visibility: visibilityReducer });
