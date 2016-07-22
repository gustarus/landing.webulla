'use strict';

let _ = require('lodash');
let $ = require('jquery');
let React = require('react');
let ReactDOM = require('react-dom');
let Header = require('./rocket/header');
let Rocket = require('./rocket/rocket');
let Clouds = require('./rocket/clouds');

module.exports = React.createClass({

  offsets: {
    clouds: [3, 150],
    header: [5, 40],
    rocket: [10, 105],
    background: [90, 100]
  },

  background: [185, 55, 60],

  throttleWait: 11,

  scrolled: 0.1,

  componentDidMount: function () {
    this.$el = $(ReactDOM.findDOMNode(this));
    this.$window = $(window);
    this.$container = this.$el.find('.js-rocket__container');

    if (_.isMobile()) {
      this.$el.addClass('scene_rocket_mobile');
    } else {
      this.reset();
      this.updateByOffset(this.scrolled, true);

      let throttledResize = _.throttle(_.bind(this.onResize, this), this.throttleWait);
      let throttledScroll = _.throttle(_.bind(this.onScroll, this), this.throttleWait);

      this.$window.on('resize', throttledResize);
      this.$window.on('scroll', throttledScroll);

      this.$el.addClass('scene_rocket_desktop');
    }
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return false;
  },

  onResize: function () {
    this.reset();
    this.updateByOffset(this.getScroll(), true);
  },

  reset: function() {
    this.area = this.getSceneArea();
    this.resetContainer();
    this.resetRocket();
    this.resetHeader();
    this.resetClouds();
  },

  resetContainer: function () {
    this.$container.removeAttr('style');
  },

  resetRocket: function () {
    this.refs.rocket.initializeOffset();
  },

  resetHeader: function () {
    this.refs.header.initializeOffset();
  },

  resetClouds: function () {
    this.refs.cloudsLeft.initializeOffset();
    this.refs.cloudsRight.initializeOffset();
  },

  onScroll: function () {
    this.updateByOffset(this.getScroll());
  },

  getScroll: function() {
    let windowOffset = this.$window.scrollTop();
    let containerOffset = windowOffset - this.area.top;

    let scrolled = containerOffset / (this.area.height / 100);
    scrolled < 0 && (scrolled = 0);
    scrolled > 100 && (scrolled = 100);
    return scrolled;
  },

  updateByOffset: function (scrolled, force = false) {
    if (scrolled !== this.scrolled || force) {
      this.updateContainerByOffset(scrolled);
      this.updateRocketByOffset(scrolled);
      this.updateHeaderByOffset(scrolled);
      this.updateCloudsByOffset(scrolled);
      this.scrolled = scrolled;
    }
  },

  updateContainerByOffset: function (scrolled) {
    let containerStyle = this.getContainerStyle(scrolled);
    this.$container.css(containerStyle);
  },

  updateRocketByOffset: function (scrolled) {
    let coefficient = this.getScrolledCoefficient(scrolled, this.offsets.rocket);
    let offset = 100 * coefficient;
    this.refs.rocket.setOffset(offset);
  },

  updateHeaderByOffset: function (scrolled) {
    let coefficient = this.getScrolledCoefficient(scrolled, this.offsets.header);
    let offset = 100 * coefficient;
    this.refs.header.setOffset(offset);
  },

  updateCloudsByOffset: function (scrolled) {
    let coefficient = this.getScrolledCoefficient(scrolled, this.offsets.clouds);
    let offset = 100 * coefficient;
    this.refs.cloudsLeft.setOffset(offset);
    this.refs.cloudsRight.setOffset(offset);
  },

  render: function () {
    return (
      <div className="scene scene_rocket js-rocket__scene">
        <div className="scene_rocket__container js-rocket__container">
          <Header ref="header"/>
          <Rocket ref="rocket"/>
          <Clouds ref="cloudsLeft" type="left" viewBox="0 0 474.6 382.238"/>
          <Clouds ref="cloudsRight" type="right" viewBox="0 0 511.229 357.591"/>
        </div>
      </div>
    );
  },

  getSceneArea: function () {
    return {
      top: this.$el.offset().top,
      left: this.$el.offset().left,
      width: this.$el.width(),
      height: this.$el.height()
    };
  },

  getScrolledCoefficient: function (current, range) {
    switch (true) {
      case current < range[0]:
        return 0;
        break;

      case current > range[1]:
        return 1;
        break;

      default:
        let coefficient = (range[1] - range[0]) / 100;
        return (current - range[0]) / coefficient / 100;
    }
  },

  getContainerStyle: function (scrolled) {
    let style = {
      position: null,
      top: null,
      bottom: null
    };

    switch (true) {
      case scrolled === 0:
        style.position = 'absolute';
        style.bottom = 0;

        style.backgroundColor = _.hsl(this.background[0], this.background[1], this.background[2]);
        break;
      case scrolled === 100:
        style.position = 'absolute';
        style.bottom = 0;

        style.backgroundColor = _.hsl(this.background[0], this.background[1], 100);
        break;

      default:
        style.position = 'fixed';

        let lightnessCoefficient = this.getScrolledCoefficient(scrolled, this.offsets.background);
        let lightness = this.background[2] + (100 - this.background[2]) * lightnessCoefficient;
        style.backgroundColor = _.hsl(this.background[0], this.background[1], lightness);
    }

    return style;
  }
});