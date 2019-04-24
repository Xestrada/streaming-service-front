import React from 'react';
import {shallow} from 'enzyme';  
import Home  from '../../../src/features/home/home';

describe('common/userComment', () => {
  it('renders correctly', () => {
    const items = {
        actions: {},
        common: {},
        profileActions: {},
        profile: {},
    }
    const renderedComponent = shallow(<Home actions={items.actions} common={items.common} profileActions={items.profileActions} actions={items.actions}/>);
    expect(renderedComponent.length).toBe(1);
  });
  });