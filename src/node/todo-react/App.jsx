import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers} from 'redux'
import {createStore} from 'redux'

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('Adding todo...');
      return [
        ...state, {
          text: action.text
        }
      ]
  }
  return state;
}

const store = createStore(combineReducers({todos}));

class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={(e) => {
          store.dispatch({type: 'ADD_TODO', text: 'New Todo'});
        }}>Add TODO</button>
        <ul>
          {this.props.todos
            ? this.props.todos.map(todo => <li>{todo.text}</li>)
          : 'No todos'}
        </ul>
      </div>
    )
  }
}

App.proptypes = {
  todos: React.PropTypes.array
}

const render = () => {
  ReactDOM.render(
    <App todos={store.getState().todos}/>, document.getElementById('app'))
};

store.subscribe(render)
render();
