import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Media} from 'reactstrap';
import img from './JPEG_example_flower.jpg';
import './footer.scss';


export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
        <NavbarBrand className="Navbar" href="/">Contact us at your@email.com or XXX-XXX-XXXX</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Media href="https://facebook.com">
              <Media object src= {img} className='img' alt="Generic placeholder image" />
              ></Media>
              <Media href="https://twitter.com">
              <Media object src= {img} className='img' alt="Generic placeholder image" />
              ></Media>
              <Media href="https://google.com">
              <Media object src= {img} className='img' alt="Generic placeholder image" />
              ></Media>
              <NavItem>
                <NavLink href="/privacyPolicy">Privacy Policy</NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}