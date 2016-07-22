'use strict';

let _ = require('lodash');
let $ = require('jquery');
require('jquery-smooth-scroll');
var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  thresholdCorrection: +300,

  throttleWait: 50,

  componentDidMount: function () {
    this.$el = $(ReactDOM.findDOMNode(this));
    this.$order = $('#scene_order');
    this.$window = $(window);

    this.listenScrollOn();
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return false;
  },

  listenScrollOn: function () {
    if (!this._throttledScroll) {
      this._throttledScroll = _.throttle(_.bind(this.onScroll, this), this.throttleWait);
    }

    this.$window.on('scroll', this._throttledScroll);
  },

  listenScrollOff: function () {
    this.$window.off('scroll', this._throttledScroll);
  },

  show: function () {
    if (!this._isVisible) {
      this.$el.removeClass('theater__button_hidden');
      this._isVisible = true;
    }
  },

  hide: function () {
    if (this._isVisible) {
      this.$el.addClass('theater__button_hidden');
      this._isVisible = false;
    }
  },

  onScroll: function () {
    let isOrderSceneVisible = this.$window.scrollTop() + this.$window.height() - this.thresholdCorrection > this.$order.offset().top;
    isOrderSceneVisible ? this.hide() : this.show();
  },

  onClick: function (e) {
    e.preventDefault();
    e.stopPropagation();

    this.$el.blur();
    this.hide();

    this.moveToTarget();
  },

  moveToTarget: function (complete = null) {
    $.smoothScroll({
      scrollTarget: this.$el.attr('href'),
      beforeScroll: () => {
        this.listenScrollOff();
      },
      afterScroll: () => {
        complete && complete.call(this);
        this.listenScrollOn();
      }
    });
  },

  render: function () {
    return (<a href="#scene_order" className="theater__button theater__button_hidden" onClick={this.onClick}>Заказать консультацию</a>)
  }
});