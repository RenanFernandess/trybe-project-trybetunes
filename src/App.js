import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Search from './pages/Search';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import Loading from './components/Loading';

class App extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButtonLogin = this.onClickButtonLogin.bind(this);

    this.state = {
      loading: false,
      loginName: '',
      buttonLoginDisabled: true,
    };
  }

  onInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { loginName } = this.state;
      const minCharacter = 3;
      this.setState({ buttonLoginDisabled: loginName.length < minCharacter });
    });
  }

  onClickButtonLogin() {
    this.setState({ loading: true }, async () => {
      const { loginName } = this.state;
      await createUser({ name: loginName });
      this.setState({ loading: false });
    });
  }

  render() {
    const { loginName, buttonLoginDisabled, loading } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              loginName={ loginName }
              buttonLoginDisabled={ buttonLoginDisabled }
              onInputChange={ this.onInputChange }
              onClickButtonLogin={ this.onClickButtonLogin }
            />) }
          />
          { loading ? <Loading /> : <Route exact path="/search" component={ Search } /> }
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
