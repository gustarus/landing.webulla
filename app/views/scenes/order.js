'use strict';

let $ = require('jquery');
let _ = require('lodash');
let React = require('react');
let ReactDOM = require('react-dom');
let Block = require('./order/block');

module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      requestUrl: null,
      feedbackEmail: null,
      feedbackPhone: null
    };
  },

  getInitialState: function () {
    return {
      url: null,
      poll: null,
      type: null,
      name: null,
      contact: null
    }
  },

  componentDidMount: function () {
    this.delegateNodes();
  },

  componentDidUpdate: function () {
    this.delegateNodes();
  },

  serialize: function () {
    return {
      url: this.$url.val(),
      poll: this.state.poll,
      type: this.state.type,
      name: this.$name.val().replace(/ /g, ''),
      contact: this.$contact.val().replace(/ /g, '')
    };
  },

  delegateNodes: function () {
    this.$el = $(ReactDOM.findDOMNode(this));
    this.$url = $('[name=url]', this.$el);
    this.$name = $('[name=name]', this.$el);
    this.$contact = $('[name=contact]', this.$el);
  },

  onTypePick: function (data) {
    this.setState({type: data});
  },

  onPollComplete: function (data) {
    this.setState({poll: data});
  },

  onFormSubmit: function (e) {
    e.preventDefault();
    e.stopPropagation();

    this.validate() && this.send({
      duplicate: this.onSendDuplicate,
      success: this.onSendSuccess,
      error: this.onSendError
    });
  },

  onFormNameChange: function (e) {
    this.validateName();
  },

  onFormContactChange: function (e) {
    this.validateContact(value);
  },

  onSendDuplicate: function () {
    alert('Заявка уже была отправлена.');
  },

  onSendSuccess: function (response) {
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  },

  onSendError: function (response) {
    alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
  },

  send: function (options = {}) {
    let data = this.serialize();
    let hash = JSON.stringify(data);
    if (hash !== this._hash) {
      if (!this._processing) {
        this._processing = true;

        $.ajax({
          type: "POST",
          url: this.props.requestUrl,
          data: data,
          dataType: 'json',
          success: () => {
            this._hash = hash;
            options.success && options.success.apply(this, arguments);
          },
          error: () => {
            options.error && options.error.apply(this, arguments);
          },
          complete: () => {
            this._processing = false;
          }
        });
      } else {
        options.processing && options.processing.call(this);
      }
    } else {
      options.duplicate && options.duplicate.call(this);
    }
  },

  validate: function () {
    let isNameValid = this.validateName();
    let isContactValid = this.validateContact();
    return isNameValid && isContactValid;
  },

  validateName: function () {
    let value = this.serialize().name;
    let isValid = value.length ? true : false;
    this.$name.toggleClass('scene_order__input_invalid', !isValid);
    return isValid;
  },

  validateContact: function () {
    let value = this.serialize().contact;
    let isValid = value.length && (_.isPhone(value) || _.isEmail(value));
    this.$contact.toggleClass('scene_order__input_invalid', !isValid);
    return isValid;
  },

  render: function () {
    let currentTypeTag = this.state.type ? this.state.type.tag : null;
    return (
      <div id="scene_order" className="scene scene_order">
        <h2 className="scene__header scene_order__header">Закажите консультацию</h2>
        <div className="scene_order__content">
          <form className="scene_order__form" autoComplete="off" onSubmit={this.onFormSubmit}>
            <div className="scene_order__offer">
              <div className="scene_order__offer-header">
                Мы проконсультируем вас по вашим задачам и подберем необходимые услуги под ваши запросы.
              </div>
              <div className="scene_order__offer-blocks">
                <Block tag="website" label="Веб-сайт" checked={currentTypeTag === 'website'} onPick={this.onTypePick}/>
                <Block tag="cutaway" label="Сайт-визитка" checked={currentTypeTag === 'cutaway'} onPick={this.onTypePick}/>
                <Block tag="landing" label="Landing page" checked={currentTypeTag === 'landing'} onPick={this.onTypePick}/>
              </div>
            </div>
            <div className="scene_order__contacts">
              <input type="text" name="name" className="scene_order__input scene_order__input_text scene_order__input_name"
                     placeholder="Ваше имя" onChange={this.onFormNameChange} value={this.state.name}/>
              <span className="scene_order__important">Leave this empty: <input type="text" name="url"/></span>
              <input type="phone" name="contact" className="scene_order__input scene_order__input_text scene_order__input_contact"
                     placeholder="Ваш телефон или email" onChange={this.onFormContactChange} value={this.state.contact}/>
              <button type="submit" className="scene_order__input scene_order__input_submit">Заказать консультацию</button>
            </div>
          </form>
        </div>
        <div className="scene_order__feedback">
          <a href={'tel:' + _.decrypt(this.props.feedbackPhone)}
             className="scene_order__feedback-item">{_.decrypt(this.props.feedbackPhone)}</a>
          <a href={'mailto:' + _.decrypt(this.props.feedbackEmail)}
             className="scene_order__feedback-item">{_.decrypt(this.props.feedbackEmail)}</a>
        </div>
      </div>
    );
  }
});