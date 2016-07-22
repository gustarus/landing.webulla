'use strict';

let _ = require('lodash');
let React = require('react');

let elements = {
  bool: require('./poll/questions/bool'),
  pick: require('./poll/questions/pick'),
  text: require('./poll/questions/text'),
  last: require('./poll/questions/last')
};

module.exports = React.createClass({

  history: [],

  getDefaultProps: function () {
    return {
      startFrom: null
    };
  },

  getInitialState: function () {
    return {question: this.props.startFrom};
  },

  onAnswerPick: function (question, key, value, next) {
    if (next = parseInt(next)) {
      this.historyPush(question, key, value, next);
      this.switchForwardTo(next);
    } else {
      console.error('Invalid next question id passed as answer.');
    }
  },

  onRepeatPick: function() {
    this.history = null;
    this.history = [];
    this.switchForwardTo(this.props.startFrom);
  },

  onCompletePick: function() {
    this.props.onComplete(this.serialize());
  },

  serialize: function() {
    return _.map(this.history, (answer) => {
      let question = this.getQuestionData(answer.question);
      return {
        question: question.label,
        answer: answer.value
      };
    });
  },

  historyPush: function (question, key, value, next) {
    this.history.push({question, key, value, next});
  },

  historyPop: function () {
    return this.history.pop();
  },

  onBackwardClick: function (e) {
    e.preventDefault();
    e.stopPropagation();
    let item = this.history.pop();
    this.switchBackwardTo(item.question);
  },

  getQuestionData: function(id) {
    return _.find(this.props.questions, ['id', id]);
  },

  createQuestion: function (id) {
    let data = this.getQuestionData(id);
    if (data) {
      data = _.clone(data);
      let type = data.type;
      delete data.type;
      if(type === 'last') {
        data.onRepeatPick = this.onRepeatPick;
        data.onCompletePick = this.onCompletePick;
      } else {
        data.onAnswerPick = this.onAnswerPick;
      }

      return React.createElement(elements[type], data);
    } else {
      console.error(`Question with id "${id}" was not found.`);
      return false;
    }
  },

  switchForwardTo: function (id) {
    this.setState({question: id});
  },

  switchBackwardTo: function (id) {
    this.setState({question: id});
  },

  render: function () {
    return (
      <div className="scene scene_poll">
        <div className="scene_poll__background"></div>
        <h2 className="scene__header scene_poll__header">{this.props.header}</h2>
        <div className="scene_poll__content">{this.createQuestion(this.state.question)}</div>
      </div>
    );
  }
});