import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a pagina login', () => {
  test('Verifica a url', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/')
  });

  test('Se possui os inputs pedidos', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();

    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument(); 
  });
  
  test('Verifica se existe um botão play', () => {
    renderWithRouterAndRedux(<App />);

    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toBeInTheDocument();
  });

  test('Verifica se o botão esta desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toBeDisabled();
  });

  test('Verifica se o botão so é ativado com os dois inputs preenchidos', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'Bananas de pijama');

    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, 'bananas@pijama.com');

    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toBeEnabled();
  });

  test('Verifica se o botão redireciona a pagina', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const tokenResponse = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };

    jest.spyOn(Storage.prototype, 'setItem')

    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'Bananas de pijama');

    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, 'bananas@pijama.com');

    const btnPlay = screen.getByTestId('btn-play');
    expect(btnPlay).toBeEnabled();

    userEvent.click(btnPlay);
    await waitFor(() => expect(history.location.pathname).toBe('/jogo')); 
  })

  test('Verifica se existe o botão de configuração existe', () => {
    renderWithRouterAndRedux(<App />);

    const btnConfig = screen.getByRole('button', { name: /configurações/i });
    expect(btnConfig).toBeInTheDocument();
  });
  test('Verifica se o botão configuração redireciona a pagina', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnConfig = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(btnConfig);

    expect(history.location.pathname).toBe('/config') ;
  });
  test('Verifica se a pagina config possui um titulo', () => {
    renderWithRouterAndRedux(<App />);

    const btnConfig = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(btnConfig);

    const titlelConfg = screen.getByRole('heading', { level: 1, name: /Configurações/i });
    expect(titlelConfg).toBeInTheDocument();
  });
});