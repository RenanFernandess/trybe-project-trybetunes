import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButtonSearch = this.onClickButtonSearch.bind(this);

    this.state = {
      loading: false,
      searchArtist: '',
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
        <section>
          <h2>{`Resultado de álbuns de: ${searchArtist}`}</h2>
        </section>
        shearch
      </section>
    );
  }
}

export default Search;
