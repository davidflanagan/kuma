// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header/header.jsx';
import TitleMenus from './title-menus/title-menus.jsx';

let container = document.getElementById('react-header');
if (container) {
    ReactDOM.render(<Header />, container);
}

let titleMenusContainer = document.getElementById('react-document-actions');
if (titleMenusContainer) {
    ReactDOM.render(<TitleMenus />, titleMenusContainer);
}
