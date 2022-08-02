import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    result: null,
    artistName: '',
    collectionName: '',
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({}, async () => {
      const result = await getMusics(id);
      const { artistName, collectionName } = result[0];

      console.log(result);

      this.setState({ result, artistName, collectionName });
    });
  }

  render() {
    const { result, artistName, collectionName } = this.state;

    return (
      <section data-testid="page-album">
        <Header />
        <main>
          <div>
            <h2 data-testid="album-name">{ collectionName }</h2>
            <strong data-testid="artist-name">{ artistName }</strong>
          </div>
          <section>
            { result && (
              result.slice(1)
                .map(({
                  trackId,
                  trackName,
                  trackViewUrl,
                }) => (
                  <MusicCard
                    key={ trackId }
                    trackName={ trackName }
                    trackViewUrl={ trackViewUrl }
                  />
                ))
            ) }
          </section>
        </main>
      </section>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
