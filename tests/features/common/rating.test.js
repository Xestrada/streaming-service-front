
import React from 'react';
import {shallow} from 'enzyme';  
import { Provider } from 'react-redux'
import  Rating  from '../../../src/features/common/rating';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();

describe('common/rating', () => {
  it('return 1 star', () => {
    let store;
    const items={
      rating: 1,
    }
    store = mockStore(items);
    const renderedComponent = shallow(<Provider><Rating rating={store}/></Provider> );
    expect(renderedComponent.find({className:'rating'})).toEqual({
      children: <span className='fa fa-star checked'>&nbsp;</span>,
    })
  });
  it('return 2 stars', () => {
    const renderedComponent = <Rating rating={'2'} />;
    expect(renderedComponent.props.rating).toBe('2');
  });
  it('return 3 stars', () => {
    const renderedComponent = <Rating rating={'3'} />;
    expect(renderedComponent.props.rating).toBe('3');
  });
  it('return 4 stars', () => {
    const renderedComponent = <Rating rating={'4'} />;
    expect(renderedComponent.props.rating).toBe('4');
  });
  it('return 5 stars', () => {
    const renderedComponent = <Rating rating={'5'} />;
    expect(renderedComponent.props.rating).toBe('5');
  });
});
