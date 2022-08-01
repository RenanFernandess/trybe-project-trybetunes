import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { searchArtist, buttonSearchIsDisabled, onInputChange } = this.props;
    return (
      <section data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            name="searchArtist"
            value={ searchArtist }
            onInput={ onInputChange }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ buttonSearchIsDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
        Search
      </section>
    );
  }
}

Search.propTypes = {
  searchArtist: propTypes.string.isRequired,
  onInputChange: propTypes.func.isRequired,
  buttonSearchIsDisabled: propTypes.bool.isRequired,
};

export default Search;
