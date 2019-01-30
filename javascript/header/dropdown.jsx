//@flow
import React from 'react';
import styled from '@emotion/styled';

type Props = {
    label: string
};

type State = {
    shown: boolean
};

const MenuContainer = styled.div`
    position: relative;
    margin: 0 15px;
`;

const MenuLabel = styled.div`
    font-size: 18px;
    font-weight: bold;
    padding: 5px;
    :hover {
        background-color: black;
        color: white;
    }
`;

const Arrow = styled.span`
    font-size: 14px;
    padding-left: 3px;
`;

const Menu = styled.ul`
    position: absolute;
    z-index: 100;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: white;
    border: solid black 1px;
    box-shadow: 3px 3px 5px black;
    padding: 10px;
    min-width: 100%;
    li {
        padding: 5px;
        white-space: nowrap;
    }
`;

export default class Dropdown extends React.Component<Props, State> {
    state: State = {
        shown: false
    };

    render() {
        return (
            <MenuContainer>
                <MenuLabel
                    onClick={() =>
                        this.setState(state => ({ shown: !state.shown }))
                    }
                >
                    {this.props.label}
                    <Arrow>{this.state.shown ? '▲' : '▼'}</Arrow>
                </MenuLabel>
                {this.state.shown && <Menu>{this.props.children}</Menu>}
            </MenuContainer>
        );
    }
}
