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
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(fromJS({
        entries: [],
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 1
          }
        }
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 2,
            '28 Days Later': 1
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(fromJS({
        entries: [],
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 3,
            '28 Days Later': 1
          }
        }
      }));
    });
  });
});