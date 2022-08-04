import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButtonSave = this.onClickButtonSave.bind(this);

    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
      buttonSaveIsDisabled: true,
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const { name, email, image, description } = user;

      this.setState({
        name,
        email,
        image,
        description,
        loading: false,
      });
    });
  }

  onInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { name: userName, email, image, description } = this.state;
      const userInfo = [userName, email, image, description];
      const regex = /^\w+[@]{1}[a-z]+\.com{1}$/g;

      const buttonSaveIsDisabled = !userInfo
        .every((item) => item) || !regex.test(email);

      this.setState({
        buttonSaveIsDisabled,
      });
    });
  }

  onClickButtonSave() {
    this.setState({}, async () => {
      const { name, email, image, description } = this.state;
      await updateUser({ name, email, image, description });
      const { history } = this.props;

      history.push('/profile');
      // this.setState({
      //   loading: false,
      // });
    });
  }

  render() {
    const {
      loading,
      buttonSaveIsDisabled,
      name,
      email,
      image,
      description,
    } = this.state;
    return (
      <section data-testid="page-profile-edit">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <form>
                <div>
                  <strong>Nome</strong>
                  <input
                    type="text"
                    name="name"
                    value={ name }
                    onInput={ this.onInputChange }
                    data-testid="edit-input-name"
                  />
                </div>
                <div>
                  <strong>E-mail</strong>
                  <input
                    type="email"
                    name="email"
                    value={ email }
                    onInput={ this.onInputChange }
                    data-testid="edit-input-email"
                  />
                </div>
                <div>
                  <strong>Descrição</strong>
                  <textarea
                    name="description"
                    value={ description }
                    onInput={ this.onInputChange }
                    cols="30"
                    rows="10"
                    data-testid="edit-input-description"
                  />
                </div>
                <div>
                  <strong>Foto</strong>
                  <input
                    type="text"
                    name="image"
                    value={ image }
                    onInput={ this.onInputChange }
                    data-testid="edit-input-image"
                  />
                </div>
                <button
                  type="button"
                  disabled={ buttonSaveIsDisabled }
                  onClick={ this.onClickButtonSave }
                  data-testid="edit-button-save"
                >
                  Editar perfil
                </button>
              </form>
            )
        }
      </section>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
