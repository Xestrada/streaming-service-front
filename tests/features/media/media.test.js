import React from 'react';
import {shallow} from 'enzyme';  
import { Provider } from 'react-redux'
import Media  from '../../../src/features/media/media';

describe('media', () => { 
  it('renders correctly', () => {
    const items = {
        actions: {},
        common: {},
        location: {},
        commonMedia: {},
    }
    const renderedComponent = shallow(<Provider store={store}><Media actions={items.actions} common={items.common} location={items.location} commonMedia={items.commonMedia}/></Provider>);
    expect(renderedComponent.length).toBe(1);
  });
  });