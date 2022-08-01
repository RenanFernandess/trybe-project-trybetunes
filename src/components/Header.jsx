import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const { name } = await getUser();
      this.setState({ userName: name, loading: false });
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </li>
        </ul>
        { loading
          ? <Loading />
          : (
            <strong
              data-testid="header-user-name"
            >
              { userName }
            </strong>) }
      </header>
    );
  }
}

export default Header;
