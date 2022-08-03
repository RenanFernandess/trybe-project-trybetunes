import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  state = {
    loading: false,
    user: {},
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();

      this.setState({
        user,
        loading: false,
      });
    });
  }

  render() {
    const { loading, user: { name, email, image, description } } = this.state;
    return (
      <section data-testid="page-profile">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <main>
                <div>
                  <img src={ image } alt="" data-testid="profile-image" />
                  <br />
                  <Link to="/profile/edit">
                    Editar perfil
                  </Link>
                </div>
                <br />
                <strong>Nome</strong>
                <p>{ name }</p>
                <br />
                <strong>E-mail</strong>
                <p>{ email }</p>
                <br />
                <strong>Descrição</strong>
                <p>{ description }</p>
              </main>
            )
        }
      </section>
    );
  }
}

export default Profile;
