'use strict';

let React = require('react');
let submit = require('../mixins/submit');

module.exports = React.createClass({

  mixins: [submit],

  getDefaultProps: function () {
    return {
      id: null,
      next: null,
      label: 'Ваши пожелания.',
      labelSubmit: 'Продолжить'
    };
  },

  render: function () {
    return (
      <div className="scene_poll__question scene_poll__question_text">
        <h5 className="scene_poll__question-label">{this.props.label}</h5>
        <form onSubmit={this.onSubmit} >
          <textarea className="scene_poll__question-text"/>
          <input type="submit" className="scene_poll__question-button" value={this.props.labelSubmit}/>
        </form>
      </div>
    );
  }
});