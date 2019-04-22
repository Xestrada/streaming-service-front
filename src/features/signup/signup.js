import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as actions from '../common/redux/actions';
import Header from '../common/header';
import Footer from '../common/footer';
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
            exp: '',
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
        signup(this.state)
            .then(() => (
                <Redirect to='/sub-init' />
            ));

    }

    render() {

        const { username, password, email, card_num, exp, name } = this.state; //eslint-disable-line
        const { common } = this.props;
        const { authen, initialSub, signupError } = common;

        const errorMessage = (signupError === null) ? null : (<Alert color='danger'>There was an error during Sign Up</Alert>);

        const redir = authen !== undefined && authen && !initialSub ? (<Redirect to='/sub-init' />) : null;

        return (
            <div>
                <Header />
                <div className='middle'>
                    <div className='coloring'>
                        {'Create your account'}
                    </div>
                    {redir}
                    {errorMessage}
                    <Form>
                        <FormGroup row>
                            <Label for='name' sm={3}>Name: </Label>
                            <Col sm={8}>
                                <Input value={name} type='name' name='name' id='name' placeholder='your name' onChange={e => this.changeState('name', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='exampleEmail' sm={3}>Email</Label>
                            <Col sm={8}>
                                <Input value={email} type='email' name='email' id='exampleEmail' placeholder='your email' onChange={e => this.changeState('email', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='exampleUsername' sm={3}>Username</Label>
                            <Col sm={8}>
                                <Input value={username} type='username' name='username' id='exampleUsername' placeholder='your username' onChange={e => this.changeState('username', e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='examplePassword' sm={3}>Password</Label>
                            <Col sm={9}>
                                <Input value={password} type='password' name='password' id='examplePassword' placeholder='your password' onChange={e => this.changeState('password', e.target.value)} />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='exampleCreditCardID' sm={3}>Credit Card Number</Label>
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
                </div>
                <Footer />
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
