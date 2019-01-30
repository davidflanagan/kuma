import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header.jsx';

let container = document.getElementById('react-header');
let props = container.dataset;
console.log(props, props.url);

ReactDOM.render(<Header url={props.url} />, container);
