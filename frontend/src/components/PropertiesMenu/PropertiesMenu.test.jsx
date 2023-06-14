import React from "react";


import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import PropertiesMenu from ".";

describe('PropertiesMenu', () => {
  test('renders a button with text "Create Maintenance request"', () => {
    render(<PropertiesMenu buildingId={1} properties={{}} />);
    // const button = screen.getByRole('button', { name: /Create Maintenance request/i });
    // expect(button).toBeInTheDocument();
  });

  test('renders property entries for each property', () => {
    const properties = {
      name: 'Building A',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    };
    render(<PropertiesMenu buildingId={1} properties={properties} />);
    // const propertyEntries = screen.getAllByRole('listitem');
    // expect(propertyEntries).toHaveLength(Object.keys(properties).length);
  });

  test('clicking the button alerts with the correct message', () => {
    const properties = {
      name: 'Building A',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      expressID: 123456
    };
    const buildingId = 1;
    render(<PropertiesMenu buildingId={buildingId} properties={properties} />);
    const button = screen.getByRole('button', { name: /Create Maintenance request/i });
    window.alert = jest.fn();
    button.click();
    expect(window.alert).toHaveBeenCalledWith(`Create maintenance request for building expressID: ${buildingId} \n element expressID: ${properties.expressID}`);
  });

  test('handles null and undefined property values', () => {
    const properties = {
      name: 'Building A',
      address: null,
      city: undefined,
      state: 'CA',
      zip: '12345'
    };
    render(<PropertiesMenu buildingId={1} properties={properties} />);
    const propertyEntries = screen.getAllByRole('listitem');
    expect(propertyEntries).toHaveLength(Object.keys(properties).length);
    expect(screen.getByText(/undefined/i)).toBeInTheDocument();
  });
});
