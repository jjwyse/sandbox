import { expect } from 'chai';
import { List, Map } from 'immutable';

import { setEntries, next, vote } from '../src/core';

describe('core', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Dumb and Dumber', 'Ace Ventura: Pet Detective');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Dumb and Dumber', 'Ace Ventura: Pet Detective')
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({ entries: List.of('Dumb and Dumber', 'Ace Ventura: Pet Detective', 'Ace Ventura: Nature Calls') });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({ pair: List.of('Dumb and Dumber', 'Ace Ventura: Pet Detective') }),
        entries: List.of('Ace Ventura: Nature Calls')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Dumb and Dumber', 'Ace Ventura: Pet Detective'),
          tally: Map({
            'Dumb and Dumber': 4,
            'Ace Ventura: Pet Detective': 2
          })
        }),
        entries: List.of('Ace Ventura: Nature Calls', 'Truman Show', 'Bruce Almighty')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Ace Ventura: Nature Calls', 'Truman Show')
        }),
        entries: List.of('Bruce Almighty', 'Dumb and Dumber')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Dumb and Dumber', 'Ace Ventura: Pet Detective'),
          tally: Map({
            'Dumb and Dumber': 3,
            'Ace Ventura: Pet Detective': 3
          })
        }),
        entries: List.of('Ace Ventura: Nature Calls', 'Truman Show', 'Bruce Almighty')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Ace Ventura: Nature Calls', 'Truman Show')
        }),
        entries: List.of('Bruce Almighty', 'Dumb and Dumber', 'Ace Ventura: Pet Detective')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Dumb and Dumber', 'Ace Ventura: Pet Detective'),
          tally: Map({ 'Dumb and Dumber': 4, 'Ace Ventura: Pet Detective': 2 })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({ winner: 'Dumb and Dumber' }));
    });
  });

  describe('vote', () => {
    describe('vote', () => {

      it('creates a tally for the voted entry', () => {
        const state = Map({
          pair: List.of('Trainspotting', '28 Days Later')
        });
        const nextState = vote(state, 'Trainspotting');
        expect(nextState).to.equal(Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1
          })
        }));
      });

      it('adds to existing tally for the voted entry', () => {
        const state = Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        });
        const nextState = vote(state, 'Trainspotting');
        expect(nextState).to.equal(Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }));
      });
    });
  });
});
