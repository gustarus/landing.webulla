'use strict';

let React = require('react');
let select = require('../mixins/select');

module.exports = React.createClass({

  mixins: [select],

  getDefaultProps: function () {
    return {
      id: null,
      next: null,
      label: 'Да или нет?',
      labelYes: 'Да',
      labelNo: 'Нет'
    };
  },

  render: function () {
    return (
      <div className="scene_poll__question scene_poll__question_bool">
        <h5 className="scene_poll__question-label">{this.props.label}</h5>
        <a href="#" className="scene_poll__question-answer" data-key={true} data-value={this.props.labelYes} data-next={this.props.next}
           onClick={this.onAnswerClick}>{this.props.labelYes}</a>
        <a href="#" className="scene_poll__question-answer" data-key={false} data-value={this.props.labelNo} data-next={this.props.next}
           onClick={this.onAnswerClick}>{this.props.labelNo}</a>
      </div>
    );
  }
});