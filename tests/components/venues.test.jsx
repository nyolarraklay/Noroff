import { it, expect, describe } from 'vitest';
import Venues from '../../src/components/VenueCard';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';

describe('Venues', () => {
  const venue = {
    id: 1,
    name: 'Venue 1',
    media: [{ url: 'image.jpg', alt: 'Venue Image' }],
    location: { city: 'New York', country: 'USA' },
    rating: 4.5,
    maxGuests: 10,
    price: '$100',
  };

  it('should render an Edit button if venueManager is true', () => {
    const venueManager = true;
    const isBooked = false;

    render(
      <BrowserRouter>
        <Venues venue={venue} isBooked={isBooked} venueManager={venueManager} />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /edit/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Edit');
  });

  it('should render a Book Now button if venueManager is false and not booked', () => {
    const venueManager = false;
    const isBooked = false;

    render(
      <BrowserRouter>
        <Venues venue={venue} isBooked={isBooked} venueManager={venueManager} />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /book now/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Book Now');
  });

  it('should render an Edit Booking button if venueManager is false and booked', () => {
    const venueManager = false;
    const isBooked = true;

    render(
      <BrowserRouter>
        <Venues venue={venue} isBooked={isBooked} venueManager={venueManager} />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /edit booking/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Edit Booking');
  });

    it('should render a loader if venue is not provided', () => {
        render(
        <BrowserRouter>
            <Venues />
        </BrowserRouter>
        );
    
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
    });

    it('should render the venue details', () => {
        render(
          <BrowserRouter>
            <Venues venue={venue} />
          </BrowserRouter>
        );
    
        const venueName = screen.getByText(venue.name);
        const venueLocation = screen.getByText(`${venue.location.city}, ${venue.location.country}`);
        const venueRating = screen.getByText(content => content.includes(venue.rating));
        const venueMaxGuests = screen.getByText(new RegExp(`Max Guest: ${venue.maxGuests}`)); // Use regular expression
        const venuePrice = screen.getByText(venue.price);
    
        expect(venueName).toBeInTheDocument();
        expect(venueLocation).toBeInTheDocument();
        expect(venueRating).toBeInTheDocument();
        expect(venueMaxGuests).toBeInTheDocument();
        expect(venuePrice).toBeInTheDocument();
      });
});