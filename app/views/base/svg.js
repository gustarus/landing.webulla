'use strict';

var React = require('react');

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      id: null,
      className: null,
      viewBox: null,
      style: null
    }
  },

  render: function () {
    let icon = {__html: '<use xlink:href="#' + this.props.id + '"></use>'};
    return (<svg className={this.props.className} viewBox={this.props.viewBox} dangerouslySetInnerHTML={icon} style={this.props.style}/>);
  }
});