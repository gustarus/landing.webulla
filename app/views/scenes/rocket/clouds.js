'use strict';

let _ = require('lodash');
let $ = require('jquery');
let React = require('react');
let ReactDOM = require('react-dom');
let Svg = require('@views/base/svg');

module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      type: null,
      viewBox: null
    };
  },

  componentDidMount: function () {
    this.$el = $(ReactDOM.findDOMNode(this));
    this.initializeOffset();
  },

  shouldComponentUpdate: function (nextProps, nextAttr) {
    return false;
  },

  initializeOffset: function () {
    this.$el.css({left: '', right: ''});
    this.startOffset = this.$el.offset().left;
    this.endOffset = this.props.type === 'left'
      ? this.startOffset - this.$el.width() : this.startOffset + this.$el.width();
    this.totalOffset = _.offset(this.startOffset, this.endOffset);
  },

  setOffset: function (offset) {
    this.$el.css({left: this.startOffset + this.totalOffset / 100 * offset, right: ''});
  },

  render: function () {
    let id = `clipart__clouds_${this.props.type}`;
    let className = `scene_rocket__clouds scene_rocket__clouds_${this.props.type}`;
    return (<Svg id={id} className={className} viewBox={this.props.viewBox}/>);
  }
});