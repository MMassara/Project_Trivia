import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
  test('Teste Login', () => {
    renderWithRouterAndRedux(<App />);

    const testEmail = screen.getByTestId('input-gravatar-email');
    const testName = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', { name: 'Play' });

    expect(testEmail).toBeInTheDocument();
    expect(testName).toBeInTheDocument();  

    expect(buttonPlay).toBeDisabled;
    userEvent.type(testEmail, 'teste@teste.com');
    userEvent.type(testName, 'Atanes');
    expect(buttonPlay).toBeEnabled;

    userEvent.click(buttonPlay);
  });

  test('Teste botão play', () => {
    renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByRole('button', { name: 'Play' });

    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled;

    userEvent.click(buttonPlay);
  });

  test('Teste botão configurações', () => {
    renderWithRouterAndRedux(<App />);

    const buttonConfig = screen.getByRole('button', { name: 'Configurações' });

    expect(buttonConfig).toBeInTheDocument();
    expect(buttonConfig).toBeEnabled;

    userEvent.click(buttonConfig);
  });
});