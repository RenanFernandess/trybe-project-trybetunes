import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    const {
      loginName,
      buttonLoginDisabled,
      onInputChange,
      onClickButtonLogin,
    } = this.props;
    return (
      <section data-testid="page-login">
        <div>
          <strong>Nome de login</strong>
          <input
            type="text"
            value={ loginName }
            name="loginName"
            onInput={ onInputChange }
            data-testid="login-name-input"
          />
        </div>
        <Link to="/search">
          <button
            type="button"
            disabled={ buttonLoginDisabled }
            data-testid="login-submit-button"
            onClick={ onClickButtonLogin }
          >
            Entrar
          </button>
        </Link>
      </section>
    );
  }
}

Login.propTypes = {
  loginName: propTypes.string.isRequired,
  buttonLoginDisabled: propTypes.bool.isRequired,
  onInputChange: propTypes.func.isRequired,
  onClickButtonLogin: propTypes.func.isRequired,
};

export default Login;
