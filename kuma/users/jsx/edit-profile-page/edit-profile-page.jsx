//@flow
//import React from "react";

type Props = {
    avatar: string,
    username: string,
    profile: string
};

export default class EditProfilePage extends React.Component<Props> {
    render() {
        return (
            <div className="column-container">
                <div className="column-2 smaller">
                    <figure className="acc-avatar">
                        <img
                            src={this.props.avatar}
                            alt={this.props.username}
                            width="200"
                            height="200"
                            className="user-photo avatar"
                        />
                        <figcaption>
                            {gettext('Change your avatar at')}{' '}
                            <a href="http://gravatar.com" rel="external">
                                gravatar.com
                            </a>
                        </figcaption>
                    </figure>
                </div>

                <div id="user-edit" className="column-half">
                    <h1>
                        {this.props.username}
                        <a
                            className="user-title-profile"
                            href={this.props.profile}
                        >
                            {gettext('View profile')}
                        </a>
                    </h1>
                </div>

                {this.props.caution && (
                    <div className="notification warning">
                        You are editing a different profile than your own. Please
                        take care!
                    </div>
                )}

                <form className="submission" method="post" action="">
                    <input type='hidden' name='csrfmiddlewaretoken' 
                           value={this.props.csrftoken}/>

      <fieldset className="section notitle" id="personal">
        <ul>
          <li id="field-beta" class="field">
            <h2>{gettext('User Information')}</h2>
                <label for="id_user-beta">
                <input type="checkbox" name="user-beta" id="id_user-beta">
                Beta tester</input>
            </label>

            <p className="field-note">{ gettext("We'd love to have your feedback on site changes! Beta testers get access to new features first and we send the occasional email asking for help testing specific things.") }</p>
          </li>
          <li id="field_email" className="field type_email required">
            <label>{gettext('Primary Email')} <a className="field-management" href={this.props.editEmailUrl}>{ gettext('Edit email') }</a></label>
            { this.props.email }
          </li>
                </ul>
                </fieldset>
</form>

            </div>
        );
    }
}
