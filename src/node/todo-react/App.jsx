import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import reducers from './reducers';

let nextId = 0;
// action creators
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextId++,
  text: text
});
const setVisibilityFilter = (filter) => ({type: 'SET_VISIBILITY_FILTER', filter: filter});
const toggleTodo = (id) => ({type: 'TOGGLE_TODO', id});

let AddTodo = ({dispatch}) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        Add TODO
      </button>
    </div>
  );
};
AddTodo.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};
AddTodo = connect()(AddTodo); // default behavior, is not subscribe to store and inject just "dispatch" function as prop

const Link = ({active, children, onClick}) => {
  return active
    ? (
      <span>{children}</span>
    )
    : (
      <a href='#' onClick={e => {
        e.preventDefault();
        onClick();
      }}>
        {children}
      </a>
    );
};
Link.propTypes = {
  active: React.PropTypes.bool.isRequired,
  children: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
};

const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibility
  };
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const Footer = () => (
  <div>
    <p>
      Show: {''}
      <FilterLink filter='SHOW_ALL'>
        All
      </FilterLink>
      {', '}
      <FilterLink filter='SHOW_ACTIVE'>
        Active
      </FilterLink>
      {', '}
      <FilterLink filter='SHOW_COMPLETED'>
        Completed
      </FilterLink>
    </p>
  </div>
);

const TodoList = ({todos, onTodoClick}) => {
  return (
    <ul>
      {todos.map(todo => <li key={todo.id} style={{
        'text-decoration': todo.completed
          ? 'line-through'
          : 'none'
      }} onClick={() => onTodoClick(todo.id)}>{todo.text}</li>)}
    </ul>
  );
};
TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  onTodoClick: React.PropTypes.func.isRequired
};

const mapStateToTodoListProps = (state) => ({todos: state.todos});

const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick: id => dispatch(toggleTodo(id))
});

const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

const TodoApp = () => (
  <div>
    <AddTodo/>
    <VisibleTodoList/>
    <Footer/>
  </div>
);

ReactDOM.render(
  <Provider store={createStore(reducers)}>
  <TodoApp/>
</Provider>, document.getElementById('app'));
