import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import {Signup} from '../../../src/features/signup';

const defaultProps = {
    meta: {
        touched: null,
        error: null
    },
    input: {
        name: 'field-name'
    },
    inputComponent: () => { return 'test case'; }
}

describe('Render Signup', () => {
    it('render correctly signup component', () => {
        const form = mount(<Signup />);
        expect(form).toMatchSnapshot();
    });
});

