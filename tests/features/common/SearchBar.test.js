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
        const array=[
          <option>
            All
      </option>,
          <option>
            Movies
      </option>,
          <option>
            TV Shows
      </option>,
          <option>
            Actors
      </option>,
          <option>
            Users
      </option>,]
        const renderedComponent = shallow(<SearchBar  filters={items.searchFilters} searchFunc={items.searchFunc} />);
        console.log(renderedComponent.find('Input').props().children)
        expect(renderedComponent.find('Input').props().children).toBe({
          const array=[
            <option>
              All
        </option>,
            <option>
              Movies
        </option>,
            <option>
              TV Shows
        </option>,
            <option>
              Actors
        </option>,
            <option>
              Users
        </option>,]
        });
  });
  });