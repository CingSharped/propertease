import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertiesMenu from '../PropertiesMenu';

describe('PropertiesMenu', () => {
  const properties = {
    name: 'Test Object',
    description: 'This is a test object',
    material: {
      name: 'Test Material',
      color: 'red',
      opacity: 0.5,
    },
    length: 10,
    width: 5,
    height: 3,
  };

  it('renders the properties menu with the correct number of entries', () => {
    render(<PropertiesMenu properties={properties} />);
    const propertyEntries = screen.getAllByTestId('property-entry');
    expect(propertyEntries).toHaveLength(6);
  });

  it('renders the property key and value correctly', () => {
    render(<PropertiesMenu properties={properties} />);
    const propertyEntries = screen.getAllByTestId('property-entry');
    expect(propertyEntries[0]).toHaveTextContent('name');
    expect(propertyEntries[0]).toHaveTextContent('Test Object');
  });

  it('renders undefined values as "undefined"', () => {
    const undefinedProperties = { name: undefined };
    render(<PropertiesMenu properties={undefinedProperties} />);
    const propertyEntries = screen.getAllByTestId('property-entry');
    expect(propertyEntries[0]).toHaveTextContent('name');
    expect(propertyEntries[0]).toHaveTextContent('undefined');
  });

  it('renders null values as "undefined"', () => {
    const nullProperties = { name: null };
    render(<PropertiesMenu properties={nullProperties} />);
    const propertyEntries = screen.getAllByTestId('property-entry');
    expect(propertyEntries[0]).toHaveTextContent('name');
    expect(propertyEntries[0]).toHaveTextContent('undefined');
  });
});
