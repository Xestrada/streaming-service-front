import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
    Collapse,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
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
            userDropdown: false,
            username: '',
            pass: '',
        };

        this.navToggle = this.navToggle.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.login = this.login.bind(this);
        this.signOut = this.signOut.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    dropdownToggle() {
        this.setState(prevState => ({
            userDropdown: !prevState.userDropdown,
        }));
    }

    navToggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    }

    modalToggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    login() {
        const { actions } = this.props;
        const { authen } = actions;
        this.setState(prevState => ({
            modal: !prevState.modal,
        }), () => {
            const { username, pass } = this.state;
            authen(username, pass);
        });
    }

    signOut() {
        const { actions } = this.props;
        const { signOut } = actions;
        signOut();
    }

    updateState(name, value) {
        this.setState({
            [name]: value,
        });
    }

    render() {
        const { modal, username, pass, isOpen, userDropdown } = this.state;
        const { common } = this.props;

        const modalElem = (
            <Modal isOpen={modal} toggle={this.modalToggle}>
                <ModalHeader toggle={this.modalToggle} className='centerModalHeader'>Member Login</ModalHeader>
                <ModalBody className='modalBody'>
                    <input value={username} type='text' id='userName' className='form-control' placeholder='username' onChange={e => this.updateState('username', e.target.value)} />
                    <input value={pass} type='password' id='userPassword' className='form-control input-sm chat-input' placeholder='password' onChange={e => this.updateState('pass', e.target.value)} />
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
                    <Button color='secondary' onClick={this.modalToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );

        const sideHead = common.authen ? (
            <Dropdown isOpen={userDropdown} toggle={this.dropdownToggle} direction='down'>
                <DropdownToggle>
                    <Media right>
                        <img className='user' src={userImg} alt='Placeholder' />
                    </Media>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>Account</DropdownItem>
                    <DropdownItem onClick={this.signOut}>Sign Out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        ) : (
            <div>
                <Button className='color-me link' color='white' onClick={this.modalToggle}>
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

                    <NavbarToggler onClick={this.navToggle} />

                    <Collapse isOpen={isOpen} navbar>

                        <Nav className='mr-auto' navbar>

                            <NavItem>
                                <Link className='color-me link' to='/movies'>Movies</Link>
                            </NavItem>

                            <NavItem>
                                <Link className='color-me link' to='/tvshows'>TV Shows</Link>
                            </NavItem>
                            {common.authen ? (
                                <NavItem>
                                    <Link className='color-me link' to='/subscriptions'>Subscriptions</Link>
                                </NavItem>
                            )
                                : null}


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
