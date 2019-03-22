//@flow
import React from 'react';
import { act, create } from 'react-test-renderer';
import Dropdown from './dropdown.jsx';

jest.useFakeTimers();

test('Dropdown closed and open snapshots', () => {
    const dropdown = create(
        <Dropdown label="Test">
            <li>foo</li>
            <li>bar</li>
        </Dropdown>
    );

    let closedTree = dropdown.toJSON();
    let closedString = JSON.stringify(closedTree);

    // Expect the menu to be closed and take a snapshot.
    // Even though the menu is closed, we expect the content to
    // be in the document so web crawlers and screen readers see it
    expect(closedString).toContain('▼');
    expect(closedString).toContain('foo');
    expect(closedString).toContain('bar');
    expect(closedTree).toMatchSnapshot();

    // Fake a click on the menu label
    act(() => {
        dropdown.toJSON().children[0].props.onClick();
    });

    let openTree = dropdown.toJSON();
    let openString = JSON.stringify(openTree);

    // Now expect the menu to be open, and snapshot it in that state
    expect(openString).toContain('▲');
    expect(closedString).toContain('foo');
    expect(closedString).toContain('bar');
    expect(openTree).toMatchSnapshot();

    // Fake a click on the document body to dismiss the menu
    act(() => {
        document.body && document.body.dispatchEvent(new MouseEvent('click'));
        jest.runAllTimers();
    });

    // Expect the menu to be closed, checking deep equality
    expect(JSON.stringify(dropdown.toJSON())).toEqual(closedString);

    // Open the menu again
    act(() => {
        dropdown.toJSON().children[0].props.onClick();
    });

    // Verify that it is opened
    expect(JSON.stringify(dropdown.toJSON())).toEqual(openString);

    // Fake a keyboard event
    act(() => {
        document.body &&
            document.body.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'A' })
            );
        jest.runAllTimers();
    });
    // The menu should still be open
    expect(JSON.stringify(dropdown.toJSON())).toEqual(openString);

    // Finally, fake the escape key
    act(() => {
        document.body &&
            document.body.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Escape' })
            );
        jest.runAllTimers();
    });
    // And expect the menu to have closed
    expect(JSON.stringify(dropdown.toJSON())).toEqual(closedString);
});
