'use strict';

let $ = require('jquery');

module.exports = {

  onSubmit: function (e) {
    e.preventDefault();
    e.stopPropagation();
    let $form = $(e.target);
    let $text = $form.find('textarea');
    this.props.onAnswerPick(this.props.id, null, $text.val(), this.props.next);
  }
};