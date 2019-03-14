import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './header.scss';

export default class Header extends React.Component {
    static propTypes = {
        buttonLabel: PropTypes.func.isRequired,
        className: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            modal: !prevState.isOpen,
        }));
    }

    render() {
        const { isOpen } = this.state;
        const { modal } = this.state;
        const { buttonLabel } = this.props;
        const { className } = this.props;
        return (
            <div>
                <Navbar color='dark' light expand='md'>

                    <NavbarBrand className='color-me' href='/'>Company 48</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />

                    <Collapse isOpen={isOpen} navbar>

                        <Nav className='mr-auto' navbar>

                            <NavItem>
                                <NavLink className='color-me' href='/movies'>Movies</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className='color-me' href='/tvshows'>TV Shows</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className='color-me' href='/subscriptions'>Subscriptions</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className='color-me' href='/about'>About</NavLink>
                            </NavItem>

                        </Nav>
                        <Nav className='ml-auto' navbar>
                            <Nav className='spacing'>

                                <Button className='color-me' color='white' onClick={this.toggle}>
                                    {buttonLabel}
Login
                                </Button>
                                <Modal isOpen={modal} toggle={this.toggle} className={className}>
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
                                        <span className='group-btn'>
                                            <a href='/' className='btn btn-primary btn-md'>
login
                                                {' '}
                                                <i className='fas fa-sign-in-alt' />
                                            </a>
                                        </span>
                                        {' '}
                                        <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>

                                <NavItem>
                                    <NavLink className='color-me' href='/components/'>Sign Up</NavLink>
                                </NavItem>
                            </Nav>
                        </Nav>

                    </Collapse>

                </Navbar>
            </div>
        );
    }
}
