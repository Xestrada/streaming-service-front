import React from 'react';
import { Input,
} from 'reactstrap';
import './SearchBar.scss';

export default class SearchBar extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-8 col-xs-offset-2'>
                        <div className='input-group'>
                            <div className='input-group-btn search-panel'>
                                <Input type='select' name='select' id='exampleSelect'>
                                    <option>All</option>
                                    <option>Title</option>
                                    <option>Genre</option>
                                    <option>Year</option>
                                    <option>Actor</option>
                                </Input>
                            </div>
                            <input type='hidden' name='search_param' value='all' id='search_param' />
                            <input type='text' className='form-control' name='x' placeholder='Search...' />
                            <span className='input-group-btn'>
                                <button className='btn btn-primary' type='submit'><i className='fas fa-search' /></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
