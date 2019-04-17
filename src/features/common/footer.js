import React from 'react';
import {
    Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import facebook from '../../images/facebooklogo.png';
import twitter from '../../images/twitterlogo.jpg';
import googleplus from '../../images/googlepluslogo.png';
import './footer.scss';


export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    }

    render() {
        return (
            <div className='dark'>
                <h1 className='relative'>Contact us at videovault.company48@gmail.com</h1>
                <div className='d-flex justify-content-center'>
                    <Media href='https://facebook.com'>
                        <Media object src={facebook} className='img' alt='Generic placeholder image' />
                    </Media>
                    <Media href='https://twitter.com'>
                        <Media object src={twitter} className='img' alt='Generic placeholder image' />
                    </Media>
                    <Media href='https://google.com'>
                        <Media object src={googleplus} className='img' alt='Generic placeholder image' />
                    </Media>
                </div>
                <div className='relative'>
                    <Link to='/privacy'>Privacy Policy</Link>
                </div>

            </div>
        );
    }
}
