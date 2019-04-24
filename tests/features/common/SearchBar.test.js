import React from 'react';
import {shallow} from 'enzyme';  
import SearchBar from '../../../src/features/common/SearchBar';

describe('common/SearchBar', () => {
  it('renders correctly', () => {
    const items = {
        searchFilters: ['All', 'Movies', 'TV Shows', 'Actors', 'Users'],
        searchFunc: () => {},
    }
    const renderedComponent = shallow(<SearchBar  filters={items.searchFilters} searchFunc={items.searchFunc} />);
        expect(renderedComponent.length).toBe(1);
  });
    it('renders correct test ', () => {
        const items = {
            searchFilters: ['All', 'Movies', 'TV Shows', 'Actors', 'Users'],
            searchFunc: () => {},
        }
        const renderedComponent = shallow(<SearchBar  filters={items.searchFilters} searchFunc={items.searchFunc} />);
        expect(renderedComponent.filters).toBe(['All', 'Movies', 'TV Shows', 'Actors', 'Users']);
  });
  });