import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Footer from '../common/footer';
import TimelinePost from '../common/timelinePost';
import './profile.scss';
import emptyImg from '../../images/noimage.png';


const posts = [
    {
        image: 'https://i.redd.it/9kzcg7xk4q321.png',
        name: 'John',
        message: 'fake',
        testing: [
            {
                comment: 'real',
                username: 'Doe',
                date_of_comment: 'Tue, 26 Mar 2019 21:37:01 GMT',
            },
            {
                comment: 'no u',
                username: 'John',
                date_of_comment: 'Tue, 26 Mar 2019 21:37:01 GMT',
            }
        ]
    },
    {
        image: 'https://www.dreadcentral.com/wp-content/uploads/2018/06/pyewacketbanner1200x627.jpg',
        name: 'Doe',
        message: 'gay',
        testing:[
            {
                comment: 'real',
                username: 'Doe',
                date_of_comment: 'Tue, 26 Mar 2019 21:37:01 GMT',
            },
            {
                comment: 'no u',
                username: 'John',
                date_of_comment: 'Tue, 26 Mar 2019 21:37:01 GMT',
            }
        ]
    }

]

class Profile extends Component {

    static propTypes = {
        common: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.getPosts = this.getPosts.bind(this);
    }
        componentDidMount() { //eslint-disable-line
        const { common } = this.props;
        const { authen } = common;
        if (authen) {
            this.getPosts();
        }

    }

    getPosts() {

        const { common, actions } = this.props;
        const {getTimeline} = actions;
        const {userData} = common;
        getTimeline(userData.id);
    }

    render() {
        const { profile } = this.props;
        const {
            timeline,
        } = profile;
         

        const postElems = this.timeline !== undefined ? this.timeline.map(post => (
            <div className='post'>
            {console.log(this.timeline)}
            <TimelinePost image='https://i.redd.it/9kzcg7xk4q321.png' name={post.post_username} message={post.post} test={post.comments} />
            </div>
      )) : null;

        return (
            <div className='background'>
                <div className='gridContainer'>
                    <div>
                        {postElems}
                        {console.log(timeline)}
                    </div>
                 </div>
                <Footer />
            </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        profile: state.profile,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
