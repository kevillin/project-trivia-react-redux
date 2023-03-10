import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken } from '../services/apiTrivia';
import { saveToken, saveNameUser } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
  }

  estadoBtn = () => {
    const { name, email } = this.state;
    const validName = name.length > 0;
    const regex = /\S+@\S+\.\S+/;
    const validEmail = regex.test(email);
    const conditional = validName && validEmail;

    this.setState({
      isDisable: !conditional,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.estadoBtn();
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const resultApi = await getToken();
    const tokenApi = resultApi.token;
    const { token, history, nameUser } = this.props;
    const { name } = this.state;
    localStorage.setItem('token', tokenApi);
    localStorage.setItem('name', name);
    nameUser(name);
    token(tokenApi);
    history.push('/jogo');
  };

  redirectToConfig = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { isDisable } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleChange }
              required
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.redirectToConfig }
          >
            Configura????es
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  token: PropTypes.func.isRequired,
  nameUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  token: (item) => dispatch(saveToken(item)),
  nameUser: (name) => dispatch(saveNameUser(name)),
});

export default connect(null, mapDispatchToProps)(Login);
