import React, { Component } from 'react';
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
