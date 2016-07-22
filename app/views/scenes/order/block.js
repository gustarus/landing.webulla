'use strict';

let _ = require('lodash');
let React = require('react');

module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      tag: null,
      label: null,
      checked: false
    };
  },

  onClick: function (e) {
    e.preventDefault();
    e.stopPropagation();
    let data = _.pick(this.props, ['tag', 'label']);
    this.props.onPick(data);
  },

  render: function () {
    let classNames = ['scene_order__offer-block', 'scene_order__offer-block_' + this.props.tag];
    if (this.props.checked) {
      classNames.push('scene_order__offer-block_checked');
    }

    return (
      <a href="#" className={classNames.join(' ')} onClick={this.onClick}>
        <span className="scene_order__offer-block-label">{this.props.label}</span>
      </a>
    );
  }
});