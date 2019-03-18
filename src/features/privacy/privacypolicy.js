import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import './privacypolicy.scss';

class PrivacyPolicy extends Component {


    render() {
        return (
            <div>
                <Header />
                <div>
                    {"We're gonna sell all your data lol"}
                </div>
                <Footer />
            </div>
        );
    }
}

export default PrivacyPolicy;
