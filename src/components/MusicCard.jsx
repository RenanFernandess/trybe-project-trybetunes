import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, trackViewUrl } = this.props;

    return (
      <section>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ trackViewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          { ' ' }
          <code>audio</code>
          .
        </audio>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  trackViewUrl: propTypes.string.isRequired,
};

export default MusicCard;
