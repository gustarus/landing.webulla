'use strict';

let defaults = {

  root: '#root',

  theater: {
    scenes: {
      advantages: {
        header: 'Наши приемущества',
        blocks: [
          {
            key: 'office',
            title: 'Распределенная система офиса',
            icon: {id: 'icon__network', area: '0 0 49.964 50.599'},
            description: 'Пока другие тратят деньги клиентов на печенье и чай в офис, мы нанимаем через интернет лучших сотрудников со всего мира.'
          },
          {
            key: 'choice',
            title: 'Команда под ваш проект',
            icon: {id: 'icon__choice', area: '0 0 45.051 41.354'},
            description: 'В других студиях сотрудники работают на нескольких проектах сразу. У нас же целая команда занимается только вашим проектом.'
          },
          {
            key: 'quality',
            title: 'Высочайшее качество услуг',
            icon: {id: 'icon__quality', area: '0 0 34.686 46.865'},
            description: 'Высокое качество услуг - наша главная задача и к ее решению мы подходим отвественно.'
          },
          {
            key: 'service',
            title: 'Комфортный клиентский сервис',
            icon: {id: 'icon__handshake', area: '0 0 64 38.024'},
            description: 'Мы прилагаем большие усилия к тому, чтобы вы были довольны общением с нами.'
          }
        ]
      },

      poll: {
        header: 'Опрос для эффективной консультации',
        startFrom: 1,
        questions: [
          {
            id: 1,
            type: 'pick',
            label: 'Какая у вас цель?',
            answers: [
              {id: 1, next: 10, label: 'Создать страницу мероприятия в интернете'},
              {id: 2, next: 20, label: 'Продать товар или услугу с помощью сайта'},
              {id: 3, next: 30, label: 'Создать персональный сайт с портфолио'},
              {id: 4, next: 40, label: 'Создать сайт компании с ее описанием'},
              {id: 5, next: 50, label: 'Создать простой сайт-визитку с контактами'},
              {id: 6, next: 100, label: 'Другой вариант'}
            ]
          },

          {id: 10, next: 11, type: 'bool', label: 'Нужна форма сбора контактов?'},
          {id: 11, next: 100, type: 'bool', label: 'Хватит одной страницы для описания?'},
          {id: 20, next: 21, type: 'bool', label: 'Вы будете продавать только один товар или услугу?'},
          {id: 21, next: 100, type: 'bool', label: 'Достаточно будет отсылать заказы на вашу почту?'},
          {id: 30, next: 31, type: 'bool', label: 'Вам нужна форма заказа на сайте?'},
          {id: 31, next: 100, type: 'bool', label: 'Вы представитель творческой профессии?'},
          {id: 40, next: 41, type: 'bool', label: 'Хотите размещать на сайте статьи?'},
          {id: 41, next: 100, type: 'bool', label: 'У вас есть техническое задание?'},
          {id: 50, next: 51, type: 'bool', label: 'Вы уже думали дизайне вашего будущего сайта?'},
          {id: 51, next: 100, type: 'bool', label: 'Хватит одной страницы для контактов?'},
          {id: 100, next: 110, type: 'text', label: 'Ваши пожелания', labelSubmit: 'Завершить опрос'},
          {
            id: 110, type: 'last', label: 'Мы сохранили ваши ответы и готовы проконсультировать вас',
            labelContinue: 'Заказать консультацию',
            labelRepeat: 'Пройти опрос заново'
          }
        ]
      },

      order: {
        requestUrl: '/api/order.php',
        feedbackEmail: 'Z2F0ZUB3ZWJ1bGxhLnJ1',
        feedbackPhone: 'KzcgKDk4NSkgNzQwIDc0NzA='
      }
    }
  }
};

module.exports = defaults;