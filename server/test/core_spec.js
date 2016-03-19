import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(fromJS({
        entries: ['Trainspotting', '28 Days Later']
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        entries: ['Sunshine'],
        vote: {
          pair: ['Trainspotting', '28 Days Later']
        }
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 2,
            '28 Days Later': 1
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Sunshine', 'Millions']
        },
        entries: ['127 Hours', 'Trainspotting']
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 2,
            '28 Days Later': 2
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Sunshine', 'Millions']
        },
        entries: ['127 Hours', 'Trainspotting', '28 Days Later']
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 1
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        winner: 'Trainspotting'
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const voteState = Map({
        pair: List.of('Trainspotting', '28 Days Later')
      });
      const nextState = vote(voteState, 'Trainspotting');
      expect(nextState).to.equal(fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 1
        }
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const voteState = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 2,
          '28 Days Later': 1
        })
      });
      const nextState = vote(voteState, 'Trainspotting');
      expect(nextState).to.equal(fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 3,
          '28 Days Later': 1
        }
      }));
    });

    it('does not allow voting on an invalid entry', () => {
      const voteState = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 2,
          '28 Days Later': 1
        })
      });
      const nextState = vote(voteState, 'Sunshine');
      expect(nextState).to.equal(fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 2,
          '28 Days Later': 1
        }
      }));
    });
  });

});