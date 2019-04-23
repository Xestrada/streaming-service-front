import React from 'react';
import {shallow} from 'enzyme';
import {Account}  from '../../../src/features/account';

describe('common/footer', () => {
  it('renders correctly', () => {

    const renderedComponent = shallow(<Account />);
    expect(renderedComponent.length).toBe(1);
  });
  });