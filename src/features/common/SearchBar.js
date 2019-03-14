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

    constructor(props) {
        super(props);

        this.state = {
            filter: 'All',
            query: '',
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.setState({
                query: e.target.value,
            }, () => {
                const { searchFunc } = this.props;
                const { filter, query } = this.state;
                searchFunc(filter, query);
            });
        }
    }

    changeState(name, value) {
        this.setState({
            [name]: value,
        });
    }

    render() {
        const { filters, searchFunc } = this.props;
        const { filter, query } = this.state;

        const searchOptions = filters.map(filter => (
            <option key={filter}>{filter}</option>
        ));

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-8 col-xs-offset-2'>
                        <div className='input-group'>
                            <div className='input-group-btn search-panel'>
                                <Input
                                  type='select'
                                  name='select'
                                  id='exampleSelect'
                                  onChange={e => this.changeState('filter', e.target.value)}
                                >
                                    {searchOptions}
                                </Input>
                            </div>

                            <input type='hidden' name='search_param' value='all' id='search_param' />
                            <input type='text' onChange={e => this.changeState('query', e.target.value)} onKeyPress={this.handleKeyPress} className='form-control' name='x' placeholder='Search...' />
                            <span className='input-group-btn'>
                                <button onClick={() => searchFunc(filter, query)} className='btn btn-primary' type='submit'><i className='fas fa-search' /></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
