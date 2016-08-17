let nextId = 0;

export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    id: nextId++,
    text: text
  };
}

export function setVisibilityFilter(filter) {
  return { type: 'SET_VISIBILITY_FILTER', filter: filter };
}

export function toggleTodo(id) {
  return { type: 'TOGGLE_TODO', id };
}

const isShuffling = (deckName) => {
  return { type: 'SHUFFLING', deckName: deckName, shuffling: true };
};

const finishedShuffling = (deckName, json) => {
  return { type: 'FINISHED_SHUFFLING', deckName: deckName, shuffling: false, metadata: json };
};

const shuffleDeck = (deckName) => {
  return (dispatch) => {
    dispatch(isShuffling(deckName));
    return fetch(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then(response => response.json())
      .then(json => dispatch(finishedShuffling(deckName, json)))
      .catch(error => console.err('Error: ' + error));
  };
};

const shouldShuffleDeck = (state, deckName) => {
  const deck = state.deck && state.deck[deckName];
  console.log(JSON.stringify(state));
  if (!deck) {
    return true;
  } else if (deck.isShuffling) {
    return false;
  }
  return deck.didInvalidate;
};

export function shuffleDeckIfNeeded(deckName) {
  return (dispatch, getState) => {
    return shouldShuffleDeck(getState(), deckName) ? dispatch(shuffleDeck(deckName)) : null;
  };
}
