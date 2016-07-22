'use strict';

let _ = require('lodash');
let React = require('react');
let Svg = require('@views/base/svg');

module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      header: '',
      blocks: []
    };
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return false;
  },

  render: function () {
    let blocks = [];
    this.props.blocks.forEach((blockData, blockKey) => {
      blocks.push(
        <div key={blockKey} className={`scene_advantages__item scene_advantages__item_${blockKey}`}>
          <div className="scene_advantages__item-preview">
            <Svg id={blockData.icon.id} className="scene_advantages__item-icon" viewBox={blockData.icon.area}/>
          </div>
          <h3 className="scene_advantages__item-label">{blockData.title}</h3>
          <div className="scene_advantages__item-description">{blockData.description}</div>
        </div>
      );
    });

    return (
      <div className="scene scene_advantages">
        <h2 className="scene__header scene_advantages__header">{this.props.header}</h2>
        <div className="scene_advantages__items">{blocks}</div>
      </div>
    );
  }
});