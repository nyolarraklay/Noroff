// Destinations.test.jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Destinations from '../../src/Components/Destinations';
import ShortListVenue from '../../src/Components/API/index';
import Venue from '../../src/Components/VenueCard';


vi.mock('../../src/Components/API/index', () => ({
  default: () => <div>ShortListVenue Component</div>
}));
vi.mock('../../src/Components/VenueCard', () => ({
  default: ({ venue }) => <div>Venue: {venue.name}</div>
}));

describe('Destinations Component', () => {
  it('renders search results when searchResults is not empty', () => {
    const searchResults = [
      { id: 1, name: 'Venue 1' },
      { id: 2, name: 'Venue 2' },
    ];

    render(<Destinations searchResults={searchResults} />);

    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByText('Venue: Venue 1')).toBeInTheDocument();
    expect(screen.getByText('Venue: Venue 2')).toBeInTheDocument();
  });

  it('renders popular destinations when searchResults is empty', () => {
    render(<Destinations searchResults={[]} />);

    expect(screen.getByText('Popular Destination')).toBeInTheDocument();
    expect(screen.getByText('ShortListVenue Component')).toBeInTheDocument();
  });
});
