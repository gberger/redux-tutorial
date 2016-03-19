import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {expect} from 'chai';

import {Results} from '../../src/components/Results';


describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('A', 'B');
    const tally = Map({'A': 5});
    const component = renderIntoDocument(<Results pair={pair} tally={tally}/>);
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [a, b] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(a).to.contain('A');
    expect(a).to.contain(5);
    expect(b).to.contain('B');
    expect(b).to.contain(0);
  });


  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('A', 'B');
    const tally = Map({'A': 5});
    const component = renderIntoDocument(
      <Results pair={pair}
               tally={tally}
               next={next}/>
    );

    Simulate.click(ReactDOM.findDOMNode(component.refs.tally.refs.next));
    expect(nextInvoked).to.equal(true);
  });


  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Trainspotting"
               pair={["Trainspotting", "28 Days Later"]}
               tally={Map()} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });

});