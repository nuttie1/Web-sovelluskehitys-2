import { render, screen } from '@testing-library/react';
import App from '../src/App';


test('renders learn react link', () => {
  const mockScores = [
    { name: 'Alice', score: 100 },
    { name: 'Bob', score: 200 },
    { name: 'Charlie', score: 150 },
  ];

  render(<App/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});