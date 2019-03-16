import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Button,
    Media,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './header.scss';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import userImg from '../../images/blank-user.jpg';

export class Header extends React.Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        common: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            modal: false,
            username: '',
            pass: '',
        };

        this.toggle = this.toggle.bind(this);
        this.login = this.login.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            modal: !prevState.isOpen,
        }));
    }

    login() {
        const { actions } = this.props;
        const { authen } = actions;
        authen();
        this.toggle();
    }

    updateState(name, value) {
        this.setState({
            [name]: value,
        });
    }

    render() {
        const { isOpen } = this.state;
        const { modal } = this.state;
        const { common } = this.props;

        const modalElem = (
            <Modal isOpen={modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><h2 className='centerModalHeader'>Member Login</h2></ModalHeader>
                <ModalBody className='modalBody'>
                    <input type='text' id='userName' className='form-control' placeholder='username' />
                    <input type='password' id='userPassword' className='form-control input-sm chat-input' placeholder='password' />
                    <label>
                        <input type='checkbox' name='remember' value='1' />
                        <span className='remember'>Remember me</span>
                    </label>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-primary btn-md' color='primary' onClick={this.login}>
                        login
                        <i className='fas fa-sign-in-alt' />
                    </Button>
                    <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );

        const sideHead = common.authen ? (
            <Media right>
                <img className='user' src={userImg} alt='Placeholder' />
            </Media>
        ) : (
            <div>
                <Button className='color-me link' color='white' onClick={this.toggle}>
                Login
                </Button>

                <Link className='color-me link' to='/signup'>Sign Up</Link>
            </div>
        );

        return (
            <div>

                {modalElem}

                <Navbar color='dark' light expand='md'>

                    <Link className='color-me brand' to='/'>Company 48</Link>

                    <NavbarToggler onClick={this.toggle} />

                    <Collapse isOpen={isOpen} navbar>

                        <Nav className='mr-auto' navbar>

                            <NavItem>
                                <Link className='color-me link' to='/movies'>Movies</Link>
                            </NavItem>

                            <NavItem>
                                <Link className='color-me link' to='/tvshows'>TV Shows</Link>
                            </NavItem>

                            <NavItem>
                                <Link className='color-me link' to='/subscriptions'>Subscriptions</Link>
                            </NavItem>

                            <NavItem>
                                <Link className='color-me link' to='/about'>About</Link>
                            </NavItem>

                        </Nav>
                        <Nav className='ml-auto' navbar>
                            <Nav className='spacing' />

                            {sideHead}

                        </Nav>

                    </Collapse>

                </Navbar>
            </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        header: state.header,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
