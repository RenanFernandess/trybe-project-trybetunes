import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <section data-testid="page-favorites">
        <Header />
        Favorites
      </section>
    );
  }
}

export default Favorites;
