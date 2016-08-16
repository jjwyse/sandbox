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
          text: action.text,
          id: action.id
        }
      ]
  }
  return state;
}

const store = createStore(combineReducers({todos}));

const AddTodo = ({onAddClick}) => {
  return (
    <button onClick={onAddClick}>Add TODO</button>
  )
};

const Todo = ({text}) => {
  return (
    <li>
      {text}
    </li>
  )
};

const TodoList = ({todos}) => {
  return (
    <ul>
      {todos.map(todo => <Todo key={todo.id} {...todo}></Todo>)}
    </ul>
  )
};

let nextId = 0;
class App extends React.Component {
  render() {
    return (
      <div>
        <AddTodo onAddClick= {(e) => store.dispatch({ type: 'ADD_TODO', text: 'New Todo', id: nextId++ })}/>
        <TodoList {...this.props}/>
      </div>
    )
  }
}

App.proptypes = {
  todos: React.PropTypes.array
}

const render = () => {
  ReactDOM.render(
    <App {...store.getState()}/>, document.getElementById('app'))
};

store.subscribe(render)
render();
