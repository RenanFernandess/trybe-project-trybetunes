import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.onFavoriteChange = this.onFavoriteChange.bind(this);

    this.state = {
      loading: false,
      result: null,
      artistName: '',
      collectionName: '',
      favoritesList: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({}, async () => {
      const result = await getMusics(id);
      const { artistName, collectionName } = result[0];

      this.setState({ result, artistName, collectionName });
    });
  }

  onFavoriteChange({ target: { id } }) {
    this.setState({ loading: true }, async () => {
      const { result, favoritesList } = this.state;
      const track = result.slice(1).find(({ trackId }) => trackId === Number(id));
      console.log(track);
      await addSong(track);

      this.setState({
        loading: false,
        favoritesList: [...favoritesList, Number(id)],
      });
    });
  }

  render() {
    const { result, artistName, collectionName, loading, favoritesList } = this.state;

    return (
      <section data-testid="page-album">
        <Header />
        { loading
          ? <Loading />
          : (
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
                      previewUrl,
                    }) => (
                      <MusicCard
                        key={ trackId }
                        trackName={ trackName }
                        trackId={ trackId }
                        previewUrl={ previewUrl }
                        favorited={
                          favoritesList
                            .some((id) => trackId === id)
                        }
                        onFavoriteChange={ this.onFavoriteChange }
                      />
                    ))
                ) }
              </section>
            </main>
          )}
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
