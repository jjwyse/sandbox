import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import reducers from './reducers';
import {addTodo, setVisibilityFilter, toggleTodo, shuffleDeckIfNeeded} from './actions';
import ReduxThunk from 'redux-thunk';

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

/** Playing around with redux-promise*/
class Async extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(shuffleDeckIfNeeded('josh'));
  }

  render() {
    const {shuffling, deckName, metadata} = this.props;
    return (
      <div>
        <h1>Deck Fun</h1>
        <p>Deck name: {deckName}</p>
        <p>Metadata: {JSON.stringify(metadata)} </p>
        {shuffling
          ? <p>Loading...</p>
            : <p>Shuffled</p>}
      </div>
    );
  }
}
Async.propTypes = {
  shuffling: React.PropTypes.bool.isRequired,
  deckName: React.PropTypes.string.isRequired,
  metadata: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToApiDataProps = (state) => {
  console.log(`Mapping state to props: ${JSON.stringify(state)}`);
  const {shuffling, deckName, metadata} = state.deck;
  return {shuffling, deckName, metadata};
};

const AsyncComponent = connect(mapStateToApiDataProps)(Async);

const TodoApp = () => (
  <div>
    <AddTodo/>
    <VisibleTodoList/>
    <Footer/>
    <AsyncComponent/>
  </div>
);

const createStorewithMiddleware = applyMiddleware(ReduxThunk)(createStore);
ReactDOM.render(
  <Provider store={createStorewithMiddleware(reducers)}>
  <TodoApp/>
</Provider>, document.getElementById('app'));
