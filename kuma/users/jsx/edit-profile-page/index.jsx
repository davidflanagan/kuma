import React from "react";
import ReactDOM from "react-dom";
import EditProfilePage from './edit-profile-page.jsx';

let container = document.getElementById('react');
let props = container.dataset;
let csrftoken = document.cookie
    .split(';')
    .filter(s => s.startsWith('csrftoken='))[0]
    .slice(10);

function render() {
    ReactDOM.render(
        <EditProfilePage
          avatar={props.avatar}
          username={props.username}
          email={props.email}
          profile={props.profile}
          csrftoken={csrftoken}
          editEmailUrl={"props.editEmailUrl"}
          />,
        container
    );
}
render();

/*
if (module.hot) {
    console.log("bar");
    module.hot.accept('./edit-profile-page.jsx', () => {
        console.log("HMR!");
        render();
    });
}

*/
