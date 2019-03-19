import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

export default class Results extends Component {
    static propTypes = {
        boxes: PropTypes.object.isRequired,
        loadingGrid: PropTypes.object.isRequired,
        error: PropTypes.object,
        backPage: PropTypes.func.isRequired,
        nextPage: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        maxPages: PropTypes.number.isRequired,
        loading: PropTypes.bool.isRequired,
    };

    render() {

        const { error, boxes, loadingGrid, backPage, nextPage, maxPages, page, loading } = this.props;

        return (
            <div>
                <div className='main'>
                    {loading && loadingGrid}
                    {error !== null && error}
                    {boxes}

                </div>
                <div className='buttonHolder'>
                    {page !== 1 ? <Button color='primary' onClick={backPage} className='paginateButton'> Back </Button>
                        : <Button color='primary' onClick={backPage} className='paginateButton' disabled> Back </Button>}
                    <h6 className='pageCounter'>
                        page:
                        {page}
                        /
                        {maxPages}
                    </h6>
                    {maxPages !== undefined && page < maxPages
                        ? <Button color='primary' onClick={nextPage} className='paginateButton'> Next </Button>
                        : <Button color='primary' onClick={nextPage} className='paginateButton' disabled> Next </Button>}
                </div>
                <br />
            </div>
        );
    }

}

Results.defaultProps = {
    error: null,
};