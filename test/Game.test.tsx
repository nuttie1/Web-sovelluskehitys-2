import { render, screen } from '@testing-library/react';
import Game from '../src/components/Game';
import React from 'react';

test('renders game header', () => {
  render(<Game />);
  const linkElement = screen.getByText(/GAME/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(<Game />);
  const welcomeMessage = screen.getByText(/Welcome to the GAME./i);
  expect(welcomeMessage).toBeInTheDocument();
});