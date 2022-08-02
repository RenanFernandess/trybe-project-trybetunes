import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbum from '../components/CardAlbum';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButtonSearch = this.onClickButtonSearch.bind(this);

    this.state = {
      loading: false,
      searchArtist: '',
      researchedArtist: '',
      buttonSearchIsDisabled: true,
      result: null,
    };
  }

  onInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { searchArtist } = this.state;
      const minCharacterSearchArtis = 2;
      this.setState({
        buttonSearchIsDisabled: (searchArtist.length < minCharacterSearchArtis),
      });
    });
  }

  onClickButtonSearch() {
    this.setState(
      { loading: true },
      async () => {
        const { searchArtist } = this.state;
        const result = await searchAlbumsAPI(searchArtist);

        this.setState({
          researchedArtist: searchArtist,
          searchArtist: '',
          result,
          loading: false,
        });
      },
    );
  }

  render() {
    const {
      loading,
      buttonSearchIsDisabled,
      searchArtist,
      researchedArtist,
      result,
    } = this.state;

    return (
      <section data-testid="page-search">
        <Header />
        { loading
          ? <Loading />
          : (
            <div>
              <input
                type="text"
                name="searchArtist"
                value={ searchArtist }
                onInput={ this.onInputChange }
                data-testid="search-artist-input"
              />
              <button
                type="button"
                disabled={ buttonSearchIsDisabled }
                data-testid="search-artist-button"
                onClick={ this.onClickButtonSearch }
              >
                Pesquisar
              </button>
            </div>
          ) }
        { result && (<h2>{`Resultado de álbuns de: ${researchedArtist}`}</h2>) }
        <section>
          { result && ((!result.length)
            ? (<p>Nenhum álbum foi encontrado</p>)
            : (
              result.map(({
                collectionId,
                artistName,
                collectionName,
                artworkUrl100,
              }) => (
                <Link
                  to={ `/album/${collectionId}` }
                  key={ collectionId }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <CardAlbum
                    artistName={ artistName }
                    collectionName={ collectionName }
                    img={ artworkUrl100 }
                  />
                </Link>
              ))
            )) }
        </section>
        shearch
      </section>
    );
  }
}

export default Search;
