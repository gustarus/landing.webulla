'use strict';

let _ = require('lodash');
let React = require('react');
let Skill = require('./skills/skill');

let previews = {
  cafafreeca: require('@core/images/portfolio-cafafreeca.jpg'),
  ufpro: require('@core/images/portfolio-ufpro.jpg'),
  webulla: require('@core/images/portfolio-webulla.jpg')
};

module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      items: [
        {
          type: 'website',
          title: 'Сайт-визитка',
          description: 'Электронная версия бумажной визитки. Оказывает "вау-эффект" на ваших клиентов.',
          preview: previews.webulla,
          href: 'http://webulla.ru'
        },
        {
          type: 'landing',
          title: 'Landing page',
          description: 'Landing page - это лицо вашего товара. Чем качественнее сделан лендинг, тем выше конверсия.',
          preview: previews.cafafreeca,
          href: 'http://cafafreeca.ru'
        },
        {
          type: 'website',
          title: 'Веб-сайт',
          description: 'Полноценный веб-сайт для вашей компании - это отличный способ создать свое представительство в интернете и увеличить количество ваших клиентов.',
          preview: previews.ufpro,
          href: 'http://uf-pro.com'
        }
      ]
    }
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return false;
  },

  render: function () {
    let blocks = [];
    _.each(this.props.items, (item, index) => {
      blocks.push(React.createElement(Skill, _.extend({key: index}, item)));
    });

    return (
      <div className="scene scene_skills">
        <h2 className="scene__header scene_skills__header">Что мы умеем</h2>
        <div className="scene_skills__blocks">{blocks}</div>
      </div>
    );
  }
});