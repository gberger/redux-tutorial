import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actions from '../actions';
import Winner from './Winner';
import Tally from './Tally';

export const Results = React.createClass({
  mixins: [PureRenderMixin],
  render() {
    if (this.props.winner) {
      return <Winner ref="winner" winner={this.props.winner} />
    } else {
      return <Tally ref="tally"
                    pair={this.props.pair}
                    tally={this.props.tally}
                    next={this.props.next}/>
    }
  }
});

function mapStateToProps(state) {
  return {
    winner: state.get('winner'),
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally'])
  }
}

export const ResultsContainer = connect(mapStateToProps, actions)(Results);
