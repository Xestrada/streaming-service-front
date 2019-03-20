import React, { Component } from 'react';
import { Col, Collapse, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from '../common/header';
import Footer from '../common/footer';
import './account.scss';

class Account extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            password: '',
            card_num: '',
            exp: '',
        };
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        const { collapse, password, card_num, exp } = this.state;
        return (
            <div>
                <Header />
                Account settings
                <div>
                    <Button color='dark' onClick={this.toggle} style={{ marginBottom: '1rem' }}>Change Password</Button>
                    <Collapse isOpen={collapse}>
                        <Form>
                            <FormGroup row>
                                <Label for='oldpassword' sm={3}>Old Password: </Label>
                                <Col sm={8}>
                                    <Input value={password} type='password' name='password' id='password' placeholder='your password' onChange={e => this.changeState('password', e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='newpassword' sm={3}>New Password: </Label>
                                <Col sm={8}>
                                    <Input value={password} type='password' name='password' id='password' placeholder='your password' onChange={e => this.changeState('password', e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='newpassword' sm={3}>Retype New Password: </Label>
                                <Col sm={8}>
                                    <Input value={password} type='password' name='password' id='password' placeholder='your password' onChange={e => this.changeState('password', e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 5 }}>
                                    <Button onClick={this.signUp}>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Collapse>
                </div>
                <div>
                    <Button color='primary' onClick={this.toggle} style={{ marginBottom: '1rem' }}>Change Payment Method</Button>
                    <Collapse isOpen={collapse}>
                        <Form>
                            <FormGroup row>
                                <Label for='exampleCreditCardID' sm={3}>New Credit Card Number</Label>
                                <Col sm={9}>
                                    <Input value={card_num} type='creditcardID' name='creditcardID' id='exampleCreditcardID' placeholder='your credit card #' onChange={e => this.changeState('card_num', e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='exampleCreditCardExp' sm={3}>Credit Card Exp</Label>
                                <Col sm={9}>
                                    <Input value={exp} type='creditcardExp' name='creditcardExp' id='exampleCreditcardExp' placeholder='your credit card exp' onChange={e => this.changeState('exp', e.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 5 }}>
                                    <Button onClick={this.signUp}>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Collapse>
                </div>
                <div>
                    <Button color='primary' onClick={this.toggle} style={{ marginBottom: '1rem' }}>Account Deactivation and Termination </Button>
                    <Collapse isOpen={collapse}>
                        <Button color='primary'>Deactivate Account</Button>
                        <Button color='danger' size='lg'>Delete your account forever</Button>
                    </Collapse>
                </div>
                <div>
                    <Button color='primary' onClick={this.toggle} style={{ marginBottom: '1rem' }}>Appearance </Button>
                    <Collapse isOpen={collapse}>
                        <FormGroup>
                            <Label for='color'>Select Background Color</Label>
                            <Input type='color' name='color' id='color'>
                                <option>rainbow</option>
                            </Input>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 5 }}>
                                <Button onClick={this.signUp}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Collapse>
                </div>
                <div>
                    <Button color='primary' onClick={this.toggle} style={{ marginBottom: '1rem' }}>Language </Button>
                    <Collapse isOpen={collapse}>
                        <FormGroup>
                            <Label for='language'>Select Language</Label>
                            <Input type='select' name='lanhuage' id='language'>
                                <option>English</option>
                                <option>Espanol</option>
                                <option>한국어</option>
                                <option>汉语</option>
                                <option>日本語</option>
                            </Input>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 5 }}>
                                <Button onClick={this.signUp}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Collapse>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Account;
