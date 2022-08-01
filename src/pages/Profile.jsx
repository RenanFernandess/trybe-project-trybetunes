import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <section data-testid="page-profile">
        <Header />
        Profile
      </section>
    );
  }
}

export default Profile;
