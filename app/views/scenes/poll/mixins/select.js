'use strict';

let $ = require('jquery');

module.exports = {

  onAnswerClick: function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(e.target).blur();
    this.props.onAnswerPick(this.props.id, e.target.dataset.key, e.target.dataset.value, e.target.dataset.next);
  }
};