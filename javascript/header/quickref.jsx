//@flow
import React from 'react';
import Select from 'react-select';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import index from './quickref-index.json';

// Predefine some groups to control the order
// they are listed in.
const groups = {
    html: [],
    css: [],
    javascript: [],
    api: [],
};
for(let key of Object.keys(index)) {
    let parts = key.split('.');
    let group = parts[0];
    if (!groups[group]) {
        groups[group] = [];
    }

    let label;
    if (group === 'api') {
        label = parts.slice(1).join('.')
    } else {
        label = parts.slice(2).join('.')
    }

    groups[group].push({label:label, 
                        value:[key.toLowerCase(), index[key]]});
}

const options = [];
for(let group of Object.keys(groups)) {
    options.push({
        label: group.toUpperCase(),
        options: groups[group]
    });
}

function filter(option, input) {
    if (input.length < 3) {
        return false;
    }
    let words = input.toLowerCase().split(' ');
    return words.every(word => option.value[0].includes(word))
}

function handleChange(option, change) {
    if (change.action === "select-option") {
        let locale = window.location.pathname.split('/')[1];
        let path = `/${locale}/docs/${option.value[1]}`;
        window.location.pathname = path;
    }
}

export default class QuickRef extends React.Component {
    render() {
        return (
            <div css={{flexBasis:400, zIndex:100}}>
              <Select
                autoFocus={true}
                noOptionsMessage={input=>null}
                onChange={handleChange}
                placeholder="Fast find: HTML, CSS, JavaScript, Web API"
                options={options}
                filterOption={filter}
                />
            </div>
        );
    }
};
