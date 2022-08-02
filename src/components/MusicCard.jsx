import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  // onInputChange = ({ target: { type, name, value, checked } }) => {
  //   this.setState({ [name]: (type === 'checkbox') ? checked : value });
  // }

  // componentDidMount() {
  //   this.setState({}, async () => {
  //     const { trackId } = this.props;
  //     const favorited = favoritesList.some(({ trackId: id }) => trackId === id);

  //     this.setState({ favorited });
  //   });
  // }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      onFavoriteChange,
      favorited,
    } = this.props;

    return (
      <section>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          { ' ' }
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
        >
          <input
            type="checkbox"
            name="favorited"
            onChange={ onFavoriteChange }
            checked={ favorited }
            id={ trackId }
          />
          Favorita
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  favorited: propTypes.bool.isRequired,
  onFavoriteChange: propTypes.func.isRequired,
};

export default MusicCard;
