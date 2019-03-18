import React, { Component } from 'react';
import { Navbar, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from '../common/header';
import Footer from '../common/footer';
import './signup.scss';

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            pass: '',
            cc: '',
            exp: '',
        }

        this.changeState = this.changeState.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    changeState(name, value) {
        this.setState({
            [name] : value,
        });
    }

    signUp() {

    }


    render() {

        const {username, pass, email, cc, exp} = this.state;


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
                            <Input value={email} type='email' name='email' id='exampleEmail' placeholder='your email' onChange={e => this.changeState('email', e.target.value)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='exampleUsername' sm={3}>Username</Label>
                        <Col sm={8}>
                            <Input value={username}type='username' name='username' id='exampleUsername' placeholder='your username' onChange={e => this.changeState('username', e.target.value)} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='examplePassword' sm={3}>Password</Label>
                        <Col sm={9}>
                            <Input value={pass}type='password' name='password' id='examplePassword' placeholder='your password' onChange={e => this.changeState('pass', e.target.value)} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='exampleCreditCardID' sm={3}>Credit Card Number</Label>
                        <Col sm={9}>
                            <Input value={cc} type='creditcardID' name='creditcardID' id='exampleCreditcardID' placeholder='your credit card #' onChange={e => this.changeState('cc', e.target.value)} />
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
