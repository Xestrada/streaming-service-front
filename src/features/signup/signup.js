import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as actions from '../common/redux/actions';
import './signup.scss';

class Signup extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        common: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            card_num: '',
        };

        this.changeState = this.changeState.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    changeState(name, value) {
        this.setState({
            [name]: value,
        });
    }

    signUp() {
        const { actions } = this.props;
        const { signup } = actions;
        const { username, name, email, password, card_num } = this.state; //eslint-disable-line
        signup({
            username,
            name,
            email,
            password,
            card_num: parseInt(card_num, 10),
        })
            .then(() => (
                <Redirect to='/sub-init' />
            ));

    }

    render() {

        const { username, password, email, card_num, name } = this.state; //eslint-disable-line
        const { common } = this.props;
        const { authen, initialSub, signupError, signupPending } = common;

        const emailError = (signupError === null || signupError.valid_email) ? null : (<Alert color='danger'>Invalid Email</Alert>);
        const nameError = (signupError === null || signupError.valid_name) ? null : (<Alert color='danger'>Invalid Name</Alert>);
        const usernameError = (signupError === null || signupError.valid_username) ? null : (<Alert color='danger'>Invalid Username</Alert>);
        const passError = (signupError === null || signupError.valid_password) ? null : (<Alert color='danger'>Invalid Password</Alert>);
        const cardError = (signupError === null || signupError.valid_card_num) ? null : (<Alert color='danger'>Invalid Card Number</Alert>);

        const redir = authen !== undefined && authen && !initialSub ? (<Redirect to='/sub-init' />) : null;

        return (
            <div>
                <div className='middle'>
                    <div className='coloring'>
                        Create your account
                    </div>
                    {redir}
                    {nameError}
                    {emailError}
                    {usernameError}
                    {passError}
                    {cardError}
                    <Form>
                        <FormGroup row>
                            <Label for='name' sm={3}>Name: </Label>
                            <Col sm={8}>
                                <Input invalid={nameError !== null} value={name} type='name' name='name' id='name' placeholder='your name' onChange={e => this.changeState('name', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='exampleEmail' sm={3}>Email</Label>
                            <Col sm={8}>
                                <Input invalid={emailError !== null} value={email} type='email' name='email' id='exampleEmail' placeholder='your email' onChange={e => this.changeState('email', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='exampleUsername' sm={3}>Username</Label>
                            <Col sm={8}>
                                <Input invalid={usernameError !== null} value={username} type='username' name='username' id='exampleUsername' placeholder='your username' onChange={e => this.changeState('username', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='examplePassword' sm={3}>Password</Label>
                            <Col sm={9}>
                                <Input invalid={passError !== null} value={password} type='password' name='password' id='examplePassword' placeholder='your password' onChange={e => this.changeState('password', e.target.value)} />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='exampleCreditCardID' sm={3}>Credit Card Number</Label>
                            <Col sm={9}>
                                <Input
                                    invalid={cardError !== null} //eslint-disable-line
                                    value={card_num} //eslint-disable-line
                                    type='number' //eslint-disable-line
                                    name='creditcardID' //eslint-disable-line
                                    id='exampleCreditcardID' //eslint-disable-line
                                    placeholder='your credit card #' //eslint-disable-line
                                    onChange={e => this.changeState('card_num', e.target.value)} //eslint-disable-line
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 5 }}>
                                <Button disabled={signupPending} onClick={this.signUp}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}


/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        home: state.home,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
