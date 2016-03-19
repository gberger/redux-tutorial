import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getPair() {
    return this.props.pair || [];
  },
  getVotes(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  },
  renderEntry(entry) {
    return (
      <div key={entry} className="entry">
        <h1>{entry}</h1>
        <div className="voteCount">
          {this.getVotes(entry)}
        </div>
      </div>
    )
  },
  render() {
    return (
      <div className="results">
        <div className="tally">
          {this.getPair().map(this.renderEntry)}
        </div>
        <div className="management">
          <button ref="next"
                  className="next"
                  onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>
    )
  }
});