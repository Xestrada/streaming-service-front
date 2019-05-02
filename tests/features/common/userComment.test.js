import React from 'react';
import {shallow} from 'enzyme';  
import UserComment  from '../../../src/features/common/userComment';

describe('common/userComment', () => {
  it('renders correctly', () => {
    const items = {
        comment: {},
        user: {},
        date: {},
    }
    const renderedComponent = shallow(<UserComment comment={items.comment} user={items.user} date={items.date}/>);
    expect(renderedComponent.length).toBe(1);
  });
  });