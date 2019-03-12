import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import './header.scss';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.toggle = this.toggle.bind(this);
        this.testFunc = this.testFunc.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    }

    render() {
        const { isOpen } = this.state;
        return (
            <div>
                <Navbar color='dark' light expand='md'>

                    <NavbarBrand className='color-me' href='/'>Company 48</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />

                    <Collapse isOpen={isOpen} navbar>

                        <Nav className='mr-auto' navbar>

                            <NavItem>
                                <NavLink className='color-me' href='/components/'>Movies</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className='color-me' href='/components/'>TV Shows</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className='color-me' href='/components/'>Subscription</NavLink>
                            </NavItem>

                            <UncontrolledDropdown nav inNavbar>

                                <DropdownToggle className='color-me' nav caret>
                    Genres
                                </DropdownToggle>

                                <DropdownMenu right>

                                    <DropdownItem>
                    COMEDY
                                    </DropdownItem>

                                    <DropdownItem>
                    SCI-FI
                                    </DropdownItem>

                                    <DropdownItem>
                    HORROR
                                    </DropdownItem>

                                    <DropdownItem>
                    ROMANCE
                                    </DropdownItem>

                                    <DropdownItem>
                    ACTION
                                    </DropdownItem>

                                    <DropdownItem>
                    ANIMATION
                                    </DropdownItem>

                                </DropdownMenu>

                            </UncontrolledDropdown>

                            <NavItem>
                                <NavLink className='color-me' href='/components/'>About</NavLink>
                            </NavItem>

                        </Nav>
                        <Nav className='ml-auto' navbar>
                            <Nav className='spacing'>

                                <UncontrolledDropdown nav inNavbar>

                                    <DropdownToggle className='color-me' nav caret>
                  Login
                                    </DropdownToggle>

                                    <DropdownMenu style={{ padding: 0 }} right>
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-md-offset-5 col-md-3'>
                                                    <div className='form-login'>
                                                        <h4>Member Login</h4>
                                                        <input type='text' id='userName' className='form-control input-sm chat-input' placeholder='username' />
                                                        <input type='text' id='userPassword' className='form-control input-sm chat-input' placeholder='password' />
                                                        <label>
                                                            <input type='checkbox' name='remember' value='1' />
                                                            <span className='remember'>Remember me</span>
                                                        </label>
                                                        <div className='clr v-lg' />
                                                        <a className='link-forget' href='/'>Forgot password?</a>
                                                        <div className='clr v-lg' />
                                                        <a className='link-signup' href='/'>Sign up</a>
                                                        <div className='clr' />
                                                        <div className='wrapper'>
                                                            <span className='group-btn'>
                                                                <a href='/' className='btn btn-primary btn-md'>
login
                                                                    {' '}
                                                                    <i className='fas fa-sign-in-alt' />
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DropdownMenu>

                                </UncontrolledDropdown>

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
