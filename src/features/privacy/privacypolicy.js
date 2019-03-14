import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from '../common/header';
import Footer from '../common/footer';
import './privacypolicy.scss';

class PrivacyPolicy extends Component {


    render() {
        return (
            <div>
                <Header />
                <Form>
                    <FormGroup row>
                        <Label for='exampleEmail' sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type='email' name='email' id='exampleEmail' placeholder='your email' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='exampleUsername' sm={2}>Username</Label>
                        <Col sm={10}>
                            <Input type='username' name='username' id='exampleUsername' placeholder='your username' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='examplePassword' sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input type='password' name='password' id='examplePassword' placeholder='your password' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='exampleRePassword' sm={2}>Re-Password</Label>
                        <Col sm={10}>
                            <Input type='password' name='password' id='examplePassword' placeholder='your password' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='exampleCreditCardID' sm={2}>Credit Card Number</Label>
                        <Col sm={10}>
                            <Input type='creditcardID' name='creditcardID' id='exampleCreditcardID' placeholder='your creditcardID' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='exampleCreditCardExp' sm={2}>Credit Card Exp</Label>
                        <Col sm={10}>
                            <Input type='creditcardExp' name='creditcardExp' id='exampleCreditcardExp' placeholder='your creditcardExp' />
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Footer />
            </div>
        );
    }
}

export default PrivacyPolicy;
