import React, { Component } from 'react';
import propTypes from 'prop-types';

class CardAlbum extends Component {
  render() {
    const {
      artistName,
      collectionName,
      img,
    } = this.props;

    return (
      <section>
        <img src={ img } alt={ collectionName } />
        <h4>{ collectionName }</h4>
        <strong>{ artistName }</strong>
      </section>
    );
  }
}

CardAlbum.propTypes = {
  artistName: propTypes.string.isRequired,
  collectionName: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
};

export default CardAlbum;
