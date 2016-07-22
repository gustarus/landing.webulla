'use strict';

let React = require('react');
let Svg = require('@views/base/svg');

module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      type: null,
      preview: null,
      title: null,
      description: 100,
      href: null
    };
  },

  render: function () {
    return (
      <a href={this.props.href} target="_blank" className={`scene_skills__block scene_skills__blocks_${this.props.type}`}>
        <div className="scene_skills__block-label">{this.props.title}</div>
        <div className="scene_skills__block-preview">
          <img className="scene_skills__block-picture" src={this.props.preview}/>
        </div>
        <div className="scene_skills__block-description">{this.props.description}</div>
      </a>
    );
  }
});