import React from 'react';
import {shallow} from 'enzyme';  
import {TimelinePost}  from '../../../src/features/common/timelinePost';

describe('common/timeline', () => {
  it('renders correctly', () => {
    const items = {
        image: {},
        name: {},
        message: {},
    }
    const renderedComponent = shallow(<TimelinePost image={items.image} name={items.name} message={items.message} />);
    expect(renderedComponent.length).toBe(1);
  });
  });