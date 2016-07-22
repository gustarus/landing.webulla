'use strict';

let $ = require('jquery');
let React = require('react');
let ReactDOM = require('react-dom');
let Svg = require('@views/base/svg');

module.exports = React.createClass({

  componentDidMount: function () {
    this.$el = $(ReactDOM.findDOMNode(this));
    this.initializeOffset();
  },

  shouldComponentUpdate: function (nextProps, nextAttr) {
    return false;
  },

  initializeOffset: function() {
    this.$el.css({top: '', bottom: ''});
    this.startOffset = this.$el.offset().top;
    this.endOffset = -this.$el.height();
    this.totalOffset = _.offset(this.startOffset, this.endOffset);
  },

  setOffset: function (offset) {
    this.$el.css({top: this.startOffset + this.totalOffset / 100 * offset, bottom: null});
  },

  render: function () {
    return (
      <div className="scene_rocket__header">
        <h1 className="scene_rocket__header-title">Веб Студия <strong>Webulla</strong></h1>
        <h2 className="scene_rocket__header-description">Мы делаем сайты. И делаем это на высшем уровне.</h2>
      </div>
    );
  }
});