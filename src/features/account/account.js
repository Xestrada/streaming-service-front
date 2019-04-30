import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './account.scss';

class Account extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            password: '',
            card_num: '',
            exp: '' };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen }));
    }

    render() {
        const { password, card_num, exp } = this.state;
        return (
            <div>
                <div>
                    <div className='title'>
                    Change Password
                    </div>
                    <Form className='positioning'>
                        <FormGroup row>
                            <Label for='oldpassword' sm={2}>Old Password: </Label>
                            <Col sm={5}>
                                <Input value={password} type='password' name='password' id='password' placeholder='your old password' onChange={e => this.changeState('password', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='newpassword' sm={2}>New Password: </Label>
                            <Col sm={5}>
                                <Input value={password} type='password' name='password' id='password' placeholder='your new password' onChange={e => this.changeState('password', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='newpassword' sm={2}>Retype New Password: </Label>
                            <Col sm={5}>
                                <Input value={password} type='password' name='password' id='password' placeholder='retype new password' onChange={e => this.changeState('password', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <Button>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <div>
                    <div className='title'>
                    Change Payment Method
                    </div>
                    <Form className='positioning'>
                        <FormGroup row>
                            <Label for='exampleCreditCardID' sm={2}>New Credit Card Number</Label>
                            <Col sm={5}>
                                <Input value={card_num} type='creditcardID' name='creditcardID' id='exampleCreditcardID' placeholder='your credit card #' onChange={e => this.changeState('card_num', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='exampleCreditCardExp' sm={2}>New Credit Card Exp</Label>
                            <Col sm={5}>
                                <Input value={exp} type='creditcardExp' name='creditcardExp' id='exampleCreditcardExp' placeholder='MM/YY' onChange={e => this.changeState('exp', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <Button>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <div>
                    <div className='title'>
                    Account Deactivation and Termination
                    </div>
                    <div className='middle'>
                        <Button color='primary' block>Deactivate Account</Button>
                    </div>
                    <div className='middle'>
                        <Button color='danger' block>Delete your account forever</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;
