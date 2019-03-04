import React, { Component } from 'react';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {

  static defaultProps = {
      children: '',
  };

  render() {
      return (
          <div className="home-app">
              <div className="page-container">{...this.props}</div>
          </div>
      );
  }
}
