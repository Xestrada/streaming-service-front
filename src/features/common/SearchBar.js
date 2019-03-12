import React from 'react';
import { Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './SearchBar.scss';

export default class SearchBar extends React.Component {
    static propTypes = {
        filters: PropTypes.array.isRequired,
        searchFunc: PropTypes.func.isRequired,
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
        }
    }

    render() {
        const { filters } = this.props;
        const searchOptions = filters.map(filter => (
            <option>{filter}</option>
        ));
        const { searchFunc } = this.props;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-8 col-xs-offset-2'>
                        <div className='input-group'>
                            <div className='input-group-btn search-panel'>
                                <Input type='select' name='select' id='exampleSelect'>

                                    {searchOptions}
                                </Input>
                            </div>

                            <input type='hidden' name='search_param' value='all' id='search_param' />
                            <input type='text' onKeyPress={this.handleKeyPress} className='form-control' name='x' placeholder='Search...' />
                            <span className='input-group-btn'>
                                <button onClick={searchFunc()} className='btn btn-primary' type='submit'><i className='fas fa-search' /></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
