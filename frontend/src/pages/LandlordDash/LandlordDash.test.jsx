import React from 'react';
import { render, screen } from '@testing-library/react';
import Landlord from './LandlordDash';

describe('Landlord component', () => {
  beforeEach(() => {
    render(<Landlord />);
  });

  it('renders the total number of tenants', () => {
    const totalTenantsElement = screen.getByText(/Total Number of Tenants:/i);
    expect(totalTenantsElement).toBeInTheDocument();
  });

  it('renders the total number of properties', () => {
    const totalPropertiesElement = screen.getByText(/Total Number of Properties:/i);
    expect(totalPropertiesElement).toBeInTheDocument();
  });

  it('renders the amount of outstanding maintenance orders', () => {
    const maintenanceOrdersElement = screen.getByText(/Amount of Outstanding Maintenance Orders:/i);
    expect(maintenanceOrdersElement).toBeInTheDocument();
  });

  it('renders the property listings', () => {
    const propertyListings = screen.getAllByRole('button', { name: /Property Listing/i });
    expect(propertyListings).toHaveLength(3);
  });

});
