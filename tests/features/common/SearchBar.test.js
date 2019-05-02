import React from 'react';
import {shallow} from 'enzyme';  
import SearchBar from '../../../src/features/common/SearchBar';


describe('common/SearchBar', () => {
    it('renders all label ', () => {
        const items = {
            searchFilters: ['All', 'Movies', 'TV Shows', 'Actors', 'Users'],
            searchFunc: () => {},
        }
        const renderedComponent = shallow(<SearchBar  filters={items.searchFilters} searchFunc={items.searchFunc} />);
        expect(renderedComponent.find('option').at(0).props().children).toBe(
           'All'
        );
  });
  it('renders movies label ', () => {
    const items = {
        searchFilters: ['All', 'Movies', 'TV Shows', 'Actors', 'Users'],
        searchFunc: () => {},
    }
    const renderedComponent = shallow(<SearchBar  filters={items.searchFilters} searchFunc={items.searchFunc} />);
    expect(renderedComponent.find('option').at(1).props().children).toBe(
       'Movies'
    );
});
it('renders TV label ', () => {
  const items = {
      searchFilters: ['All', 'Movies', 'TV Shows', 'Actors', 'Users'],
      searchFunc: () => {},
  }
  const renderedComponent = shallow(<SearchBar  filters={items.searchFilters} searchFunc={items.searchFunc} />);
  expect(renderedComponent.find('option').at(2).props().children).toBe(
     'TV Shows'
  );
});
it('renders actors label ', () => {
  const items = {
      searchFilters: ['All', 'Movies', 'TV Shows', 'Actors', 'Users'],
      searchFunc: () => {},
  }
  const renderedComponent = shallow(<SearchBar  filters={items.searchFilters} searchFunc={items.searchFunc} />);
  expect(renderedComponent.find('option').at(3).props().children).toBe(
     'Actors'
  );
});
it('renders users label ', () => {
  const items = {
      searchFilters: ['All', 'Movies', 'TV Shows', 'Actors', 'Users'],
      searchFunc: () => {},
  }
  const renderedComponent = shallow(<SearchBar  filters={items.searchFilters} searchFunc={items.searchFunc} />);
  expect(renderedComponent.find('option').at(4).props().children).toBe(
     'Users'
  );
});
it('onClick test', () => {
  const items = {
      searchFilters: ['All', 'Movies', 'TV Shows', 'Actors', 'Users'],
      searchFunc: () => {},
  } 
  const renderedComponent = shallow(<SearchBar onChange={jest.fn()} filters={items.searchFilters} searchFunc={items.searchFunc} />);   
  renderedComponent.instance().changeState=jest.fn();
  renderedComponent.instance().forceUpdate()
  renderedComponent.update()
  renderedComponent.find('button').simulate('click');  
  expect(renderedComponent.instance().changeState).toHaveBeenCalled();
});
  });