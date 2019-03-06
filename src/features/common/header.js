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
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import './header.scss';

export default class Header extends React.Component {
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

                            <UncontrolledDropdown nav inNavbar>

                                <DropdownToggle className='color-me' nav caret>
                  Login
                                </DropdownToggle>

                                <DropdownMenu right>
                                    <Form inline>

                                        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                                            <Label for='exampleEmail' className='mr-sm-2'>Email</Label>
                                            <Input type='email' name='email' id='exampleEmail' placeholder='something@idk.cool' />
                                        </FormGroup>

                                        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                                            <Label for='examplePassword' className='mr-sm-2'>Password</Label>
                                            <Input type='password' name='password' id='examplePassword' placeholder="don't tell!" />
                                        </FormGroup>

                                        <Button>Submit</Button>

                                    </Form>
                                </DropdownMenu>

                            </UncontrolledDropdown>

                            <NavItem>
                                <NavLink className='color-me' href='/components/'>Sign Up</NavLink>
                            </NavItem>

                        </Nav>

                    </Collapse>

                </Navbar>

            </div>
        );
    }
}
