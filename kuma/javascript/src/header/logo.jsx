//@flow
import * as React from 'react';
import { css } from '@emotion/core';

const styles = {
    logo: css({
        display: 'block',
        height: 48,
        width: 219,
        // The sprite image includes a mask, and is not itself 48px high
        // so we need overflow to hide the mask.
        overflow: 'hidden'
    })
};

export default function Logo(props: {| url: string |}): React.Node {
    return (
        <a css={styles.logo} href={props.url}>
            <img src="/static/img/web-docs-sprite.svg" alt="MDN Web Docs" />
        </a>
    );
}
