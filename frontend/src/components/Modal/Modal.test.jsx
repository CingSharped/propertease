import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Modal from '.';

describe('Clicker Component', () => {
  beforeEach(() => {
    render(<Modal />)
  })

  afterEach(() => {
    cleanup()
  })

  it('should displays a modal container', () => {
    const element = screen.getByRole('modal-container')
    expect(element).toBeInTheDocument()
  })

  it('displays a button to close the modal', () => {
    const element = screen.getByRole('close-modal')
    expect(element).toBeInTheDocument()
  })
})
