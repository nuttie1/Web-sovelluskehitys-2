import { render, screen } from '@testing-library/react';
import Game from '../components/Game';
import React from 'react';

test('renders game header', () => {
  render(<Game />);
  const header = screen.getByText('GAME');
  expect(header).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(<Game />);
  const welcomeMessage = screen.getByText('Welcome to the GAME.');
  expect(welcomeMessage).toBeInTheDocument();
});