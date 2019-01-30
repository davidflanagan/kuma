//@flow
import React from 'react';

type Props = {
    url: string
};

export default class Logo extends React.Component<Props> {
    render() {
        return (
            <a css={{margin:0}} className="logo" href={this.props.url}>
                MDN Web Docs
            </a>
        );
    }
}
