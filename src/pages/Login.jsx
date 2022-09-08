import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiTrivia from '../services/apiTrivia';
import { saveToken } from '../redux/actions';
import PropTypes from 'prop-types';

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
    this.setState({ [name]: value }, () => this.estadoBtn());
  };
  
  handleClick = async (event) => {
    event.preventDefault();
    const resultApi = await apiTrivia();
    const tokenApi = resultApi.token;
    localStorage.setItem('token', tokenApi);
    const { token, history } = this.props;
    token(tokenApi);
    history.push('/jogo')
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
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
  push: PropTypes.func,
  }).isRequired,
}; 

const mapDispatchToProps = (dispatch) => ({
  token: (item) => dispatch(saveToken(item)),
});

export default connect(null, mapDispatchToProps)(Login);
