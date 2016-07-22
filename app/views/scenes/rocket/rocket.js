'use strict';

let _ = require('lodash');
var $ = require('jquery');
var React = require('react');
let ReactDOM = require('react-dom');
let Svg = require('@views/base/svg');

module.exports = React.createClass({

  componentDidMount: function () {
    this.$el = $(ReactDOM.findDOMNode(this));
    this.$guide = this.$el.find('.scene_rocket__rocket-guide');
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
    this.$guide.toggleClass('scene_rocket__rocket-guide_visible', offset ? false : true);
  },

  render: function () {
    return (
      <div className="scene_rocket__rocket">
        <Svg id="clipart__rocket" className="scene_rocket__rocket-icon" viewBox="0 0 33 67"/>
        <div className="scene_rocket__rocket-guide scene_rocket__rocket-guide_left">
          <div className="scene_rocket__rocket-guide-label">Наш бизнес</div>
          <Svg id="clipart__rocket-guide_left" className="scene_rocket__rocket-guide-icon" viewBox="0 0 38 16"/>
        </div>
        <div className="scene_rocket__rocket-guide scene_rocket__rocket-guide_right">
          <div className="scene_rocket__rocket-guide-label">Ваш бизнес</div>
          <Svg id="clipart__rocket-guide_right" className="scene_rocket__rocket-guide-icon" viewBox="0 0 38 16"/>
        </div>
      </div>
    );
  }
});