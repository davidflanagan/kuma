//import React from "react";
//import ReactDOM from "react-dom";
import EditProfilePage from './edit-profile-page.jsx';

let container = document.getElementById('react');
let props = container.dataset;
let csrftoken = document.cookie
    .split(';')
    .filter(s => s.startsWith('csrftoken='))[0]
    .slice(10);

ReactDOM.render(
    <EditProfilePage
        avatar={props.avatar}
        username={props.username}
        profile={props.profile}
        csrftoken={csrftoken}
    />,
    container
);
