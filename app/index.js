'use strict';

require('@core/helpers/mixin');
require('@core/styles/application.styl');

let config = require('@core/config/defaults');

let $ = require('jquery');
let React = require('react');
let ReactDOM = require('react-dom');

let Theater = require('@views/theater');
let perfomance = <Theater {...config.theater}/>;

let $root = $(config.root);
ReactDOM.render(perfomance, $root.empty().get(0));

