import React from 'react';
import { getByRole, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a tela de feedback', () => {
  test('Testa se o header tem as informações do usuario', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/Feedback');
  
    const imgGravatar = screen.getByTestId('header-profile-picture')
    expect(imgGravatar).toBeInTheDocument();

    const nameUser = screen.getByTestId('header-player-name');
    expect(nameUser).toBeInTheDocument();

    const scoreUser = screen.getByTestId('header-score');
    expect(scoreUser).toBeInTheDocument();
  });
  test('Verifica se é redirecionado a pagina de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/Feedback');

    const btnPlayAgain = screen.getByTestId('btn-play-again');
    userEvent.click(btnPlayAgain);

    expect(history.location.pathname).toBe('/')
  });
  test('Verifica se é redirecionado a pagina de ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/Feedback');

    const btnRanking = screen.getByTestId('btn-ranking');
    userEvent.click(btnRanking);

    expect(history.location.pathname).toBe('/ranking')
  });
});