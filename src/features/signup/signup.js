import React, { Component } from 'react';
import { Navbar, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from '../common/header';
import Footer from '../common/footer';
import './signup.scss';
import { applyMiddleware } from '../../../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/@types/redux-logger/node_modules/redux';

class Signup extends Component {


    render() {
        return (
            <div>
                <Header />
                <div className='middle'>
                <div className='coloring'>
                    {'Create your account'}
                </div>
                <Form>
                    <FormGroup row>
                        <Label for='exampleEmail' sm={3}>Email</Label>
                        <Col sm={8}>
                            <Input type='email' name='email' id='exampleEmail' placeholder='your email' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='exampleUsername' sm={3}>Username</Label>
                        <Col sm={8}>
                            <Input type='username' name='username' id='exampleUsername' placeholder='your username' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='examplePassword' sm={3}>Password</Label>
                        <Col sm={9}>
                            <Input type='password' name='password' id='examplePassword' placeholder='your password' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='exampleRePassword' sm={3}>Re-Password</Label>
                        <Col sm={9}>
                            <Input type='password' name='password' id='examplePassword' placeholder='retype password' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='exampleCreditCardID' sm={3}>Credit Card Number</Label>
                        <Col sm={9}>
                            <Input type='creditcardID' name='creditcardID' id='exampleCreditcardID' placeholder='your credit card #' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='exampleCreditCardExp' sm={3}>Credit Card Exp</Label>
                        <Col sm={9}>
                            <Input type='creditcardExp' name='creditcardExp' id='exampleCreditcardExp' placeholder='your credit card exp' />
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 5 }}>
                            <Button>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Signup;
