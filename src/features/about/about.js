import React, { Component } from 'react';
import './about.scss';

class About extends Component {


    render() {

        return (
            <div>
                <div>
                    <img className='aboutImage' src='https://i.imgur.com/h93RfrU.jpg' alt='' />
                    <div className='text-imageCentered'>About Us</div>
                    <img className='logoImage' src='https://i.imgur.com/6mIyNnf.png' alt='' />
                </div>
                <div className='container'>
                    <span style={{ color: 'red', fontSize: '1.5em' }}>
                        <h1 style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>IMPORTANT!</h1>
                    THIS WEBSITE IS ONLY FOR ACADEMIC PURPOSE ONLY. THE WEBSITE PURPOSE IS DEVELOPED FOR SCHOOL PROJECT ONLY. WE WILL NOT SHARE AND LINK TO PUBLIC FOR ANY COPYRIGHT ISSUES.
                    </span>
                    <h2 className='textCenter'>THE BUSINESS OF GOOD STREAMING SERVICE</h2>
                    <p>
                        Video Vault also known as VV is one of the most trusted media
                        stream service to its members, international
                        subscriber. Created this website with end-user
                        in mind that provides worldwide audiences with an digital media
                        and social viewing experience. VV give the worldwide audience to enjoy
                        the video anywhere and anytime they want with the time they choose.
                        It can also interact with different members in the website to have
                        discussion of their favorite TV shows or Movies.
                    </p>
                </div>
            </div>
        );
    }
}

export default About;
