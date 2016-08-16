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

class AddTodo extends React.Component {
  render() {
    const onAddClick = (e) => store.dispatch({
      type: 'ADD_TODO',
      text: 'New Todo',
      id: nextId++
    });

    return (
      <button onClick={onAddClick}>Add TODO</button>
    )
  }
};

const Todo = ({text}) => {
  return (
    <li>
      {text}
    </li>
  )
};

class TodoList extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const state = store.getState();

    return (
      <ul>
        {state.todos.map(todo => <Todo key={todo.id} {...todo}></Todo>)}
      </ul>
    )
  }
};

let nextId = 0;
const TodoApp = () => (
  <div>
    <AddTodo/>
    <TodoList/>
  </div>
);

ReactDOM.render(
  <TodoApp/>, document.getElementById('app'))
