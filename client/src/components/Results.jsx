import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Winner from './Winner';
import Tally from './Tally';

export default React.createClass({
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