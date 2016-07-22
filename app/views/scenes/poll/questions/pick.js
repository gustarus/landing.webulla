'use strict';

let _ = require('lodash');
let React = require('react');
let select = require('../mixins/select');

module.exports = React.createClass({

  mixins: [select],

  getDefaultProps: function () {
    return {
      id: null,
      label: 'Выберите подходящий вариант.',
      answers: []
    };
  },

  render: function () {
    let answers = _.map(this.props.answers, data => {
      return <a href="#" key={data.id} className="scene_poll__question-answer" data-key={data.id} data-value={data.label} data-next={data.next}
                onClick={this.onAnswerClick}>{data.label}</a>
    });

    return (
      <div className="scene_poll__question scene_poll__question_pick">
        <h5 className="scene_poll__question-label">{this.props.label}</h5>
        {answers}
      </div>
    );
  }
});