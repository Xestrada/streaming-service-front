import React from 'react';
import {shallow} from 'enzyme';  
import Media  from '../../../src/features/media/media';

describe('media', () => {
  it('renders correctly', () => {
    const items = {
        actions: {},
        common: {},
        location: {},
        commonMedia: {},
    }
    const renderedComponent = shallow(<Media actions={items.actions} common={items.common} location={items.location} commonMedia={items.commonMedia}/>);
    expect(renderedComponent.length).toBe(1);
  });
  });