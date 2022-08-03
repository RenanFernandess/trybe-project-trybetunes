import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    loading: false,
    favoritesList: null,
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favoritesList = await getFavoriteSongs();

      this.setState({
        favoritesList,
        loading: false,
      });
    });
  }

  onFavoriteChange = ({ target: { id } }) => {
    this.setState({ loading: true }, async () => {
      const { favoritesList } = this.state;
      const track = favoritesList.find(({ trackId }) => trackId === Number(id));
      await removeSong(track);
      const newFavoritesList = await getFavoriteSongs();

      this.setState({
        favoritesList: newFavoritesList,
        loading: false,
      });
    });
  }

  render() {
    const { loading, favoritesList } = this.state;
    return (
      <section data-testid="page-favorites">
        <Header />
        { loading
          ? <Loading />
          : (
            <main>
              <section>
                { favoritesList && (
                  favoritesList
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
                            .some(({ trackId: id }) => trackId === id)
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

export default Favorites;
