import { render, screen } from '@testing-library/react';
import App from '../App';

// Test that the App.tsx renders correct navigation links
test('renders navigation links', () => {
  render(<App />);
  const gameButton = screen.getByText('Game');
  const leaderboardButton = screen.getByText('Leaderboard');
  expect(gameButton).toBeInTheDocument();
  expect(leaderboardButton).toBeInTheDocument();
});
