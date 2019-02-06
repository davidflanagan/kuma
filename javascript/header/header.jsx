//@flow
import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Logo from './logo.jsx';
import Dropdown from './dropdown.jsx';
import QuickRef from './quickref.jsx';
import gettext from '../gettext.js';

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Spring = styled.div`
    flex: 1 1 0px;
`;

const Strut = styled.div(props => ({
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: props.width
}));

const menus = [
    {
        label: 'Technologies',
        items: [
            { url: 'Web/HTML', label: 'HTML' },
            { url: 'Web/CSS', label: 'CSS' },
            { url: 'Web/JavaScript', label: 'JavaScript' },
            { url: 'Web/Guide/Graphics', label: 'Graphics' },
            { url: 'Web/HTTP', label: 'HTTP' },
            { url: 'Web/API', label: 'APIs / DOM' },
            {
                url: 'Mozilla/Add-ons/WebExtensions',
                label: 'Browser Extensions'
            },
            { url: 'Web/MathML', label: 'MathML' }
        ]
    },
    {
        label: 'References & Guides',
        items: [
            { url: 'Learn', label: 'Learn web development' },
            { url: 'Web/Tutorials', label: 'Tutorials' },
            { url: 'Web/Reference', label: 'References' },
            { url: 'Web/Guide', label: 'Developer Guides' },
            { url: 'Web/Accessibility', label: 'Accessibility' },
            { url: 'Games', label: 'Game development' },
            { url: 'Web', label: '...more docs' }
        ]
    },
    {
        label: 'Feedback',
        items: [
            { url: "https://support.mozilla.org/", 
              label: 'Get Firefox help', external: true},
            { url: "https://stackoverflow.com/", 
              label: 'Get web development help', external:true},
            { url: 'MDN/Community', label: 'Join the MDN community'},
            { 
                label: "Report a content problem",
                external: true,
                url: `https://github.com/mdn/sprints/issues/new?template=issue-template.md&projects=mdn/sprints/2&labels=user-report&title=${encodeURIComponent(window.location)}`
            },
            {
                label: "Report a bug",
                external: true,
                url: "https://bugzilla.mozilla.org/form.mdn"
            },
        ]
    }
];

function fixurl(url) {
    if (url.startsWith('https://')) {
        return url;
    } else {
        let locale = window.location.pathname.split('/')[1];
        return `/${locale}/docs/${url}`;
    }
}

type Props = {
    url: string
};

export default class Header extends React.Component<Props> {
    render() {
        return (
            <Row>
                <Logo url={this.props.url} />
                {menus.map(m => (
                    <Dropdown label={gettext(m.label)}>
                        {m.items.map(item => (
                            <li>
                              {
                              item.external 
                              ? (<a target="_blank" rel="noopener"
                                    href={fixurl(item.url)}>
                                    {gettext(item.label)} &#x1f310;
                              </a>)
                                : (<a href={fixurl(item.url)}>
                                    {gettext(item.label)}
                                   </a>)
                              }
                            </li>
                        ))}
                    </Dropdown>
                ))}
                <Spring/>
                <QuickRef/>
                <Strut width={15}/>
            </Row>
        );
    }
}
