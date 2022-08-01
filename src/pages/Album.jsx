import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <section data-testid="page-album">
        <Header />
        Album
      </section>
    );
  }
}

export default Album;
