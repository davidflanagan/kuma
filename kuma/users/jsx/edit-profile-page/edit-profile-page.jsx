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

{this.props.csrftoken}

            </div>
        );
    }
}
