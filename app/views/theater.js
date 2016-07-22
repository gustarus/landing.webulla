'use strict';

let $ = require('jquery');
let _ = require('lodash');
var React = require('react');
let ReactDOM = require('react-dom');
let Rocket = require('@views/scenes/rocket');
let Skills = require('@views/scenes/skills');
let Advantages = require('@views/scenes/advantages');
let Order = require('@views/scenes/order');
let Poll = require('@views/scenes/poll');
let Button = require('@views/button');

module.exports = React.createClass({

  componentDidMount: function () {
    this.$el = $(ReactDOM.findDOMNode(this));

    setTimeout(() => {
      this.$el.addClass('theater_mounted');
    }, 0);

    if (_.isMobile()) {
      this.$el.addClass('theater_mobile');
    } else {
      this.$el.addClass('theater_desktop');
    }

    if(_.isTouch()) {
      this.$el.addClass('theater_touch');
    }
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return false;
  },

  onPollComplete: function(data) {
    this.refs.order.onPollComplete(data);
    this.refs.button.moveToTarget();
  },

  render: function () {
    return (
      <div className="theater">
        <Rocket ref="rocket"/>
        <Skills ref="skills"/>
        <Advantages ref="advantages" {...this.props.scenes.advantages}/>
        <Poll ref="poll" onComplete={this.onPollComplete} {...this.props.scenes.poll}/>
        <Order ref="order" {...this.props.scenes.order}/>
        <Button ref="button"/>
      </div>
    )
  }
});