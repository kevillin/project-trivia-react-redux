import React, { Component } from 'react';

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
          >
            Play
          </button>
        </form>
      </section>
    );
  }
}

export default Login;
