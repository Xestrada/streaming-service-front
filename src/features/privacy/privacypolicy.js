import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import './privacypolicy.scss';

class PrivacyPolicy extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className='maintitle'>
                    {'Privacy Policy'}
                </div>
                <div className='mainparagraph'>
                We believe our users should know what data is being collected from them and how it is being used, and that they should
                have control over both. We want to encourage users to make the best decisions about the information
                being shared with us. We want you to feel safe when you are on Video Vault, which is why we encourage you to let us know if
                videos or comments on the site violate your privacy or sense of safety. If someone makes a comment that contains
                information about you without your consent, then you may petition to have the comment removed. The removal must
                can only proceed if a violation is identifiable with a factor of image, name, financial information, contact
                information, or other personal indentifiable information.
                </div>

                <div className='paragraphtitle'>
                    {'Terms and Conditions'}
                </div>
                <div className='paragraph'>
                    In order to use the service users must agree to our data collection policies. This is a
                    non-negotionable condition. Any information may be given to government agencies due to the
                    Patriot Act. Information may also be given to any potential future parent company.
                </div>
                <div className='paragraphtitle'>
                    {'Viewership Information'}
                </div>
                <div className='paragraph'>
                    Data will be collected on the content each user views. This data includes what is being
                    viewed and for how long. This data is being collected to optimized each user experience with services
                    like recommendations and returning from where you left off.
                </div>
                <div className='paragraphtitle'>
                    {'Public Information'}
                </div>
                <div className='paragraph'>
                    Information that is posted on public forums such as comment sections are public and will
                    be able to be seen by anyone and will be recorded. Profile information will be available to
                    friends and will be recorded.
                </div>
                <div className='paragraphtitle'>
                    {'Payment Information'}
                </div>
                <div className='paragraph'>
                    Payment information given will be recorded and saved safely and used to automatically
                    withdraw money to renew subscription.
                </div>
                <Footer />
            </div>
        );
    }
}

export default PrivacyPolicy;
