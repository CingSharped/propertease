import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import IfcViewer from './IfcViewer';

describe('IfcViewer component', () => {
  it('renders without errors', () => {
    render(<IfcViewer />);
    // Add assertions to check if the component renders without errors
  });

  it('handles double click event', () => {
    render(<IfcViewer />);
    // Simulate a double click event on the viewer container
    const viewerContainer = document.getElementById('viewer-container');
    fireEvent.doubleClick(viewerContainer);
    // Add assertions to check the expected behavior after the double click event
  });

  // Add more tests as needed

  it('toggles the property menu when the "Close menu" button is clicked', () => {
    render(<IfcViewer />);
    // Simulate a click event on the "Close menu" button
    const closeButton = document.querySelector('button[aria-label="Close menu"]');
    fireEvent.click(closeButton);
    // Add assertions to check if the property menu is toggled
  });
});
