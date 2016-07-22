'use strict';

let React = require('react');

module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      id: null,
      next: null,
      label: 'Спасибо!',
      labelContinue: 'Продолжить',
      labelRepeat: 'Повторить'
    };
  },

  onCompleteClick: function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onCompletePick();
  },

  onRepeatClick: function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onRepeatPick();
  },

  render: function () {
    return (
      <div className="scene_poll__question">
        <h5 className="scene_poll__question-label">{this.props.label}</h5>
        <a href="#" className="scene_poll__question-button" onClick={this.onCompleteClick}>{this.props.labelContinue}</a>
        <a href="#" className="scene_poll__question-button" onClick={this.onRepeatClick}>{this.props.labelRepeat}</a>
      </div>
    );
  }
});