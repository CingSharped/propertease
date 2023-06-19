import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'


import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NewRequestForm from '.';

describe('Clicker Component', () => {
  beforeEach(() => {
    render(<NewRequestForm />)
  })

  afterEach(() => {
    cleanup()
  })

  it('should display two heading with appropriate text', () => {
    const element = screen.getAllByRole('heading')
    expect(element.length).toEqual(2)
  })

  it('should display a form', () => {
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()

    expect(form.childNodes.length).toBe(5)
  })

  it('shown display a dropdown a menu with 6 items when clicked', async () => {
    const dropdown = screen.getByRole("work-type-dropdown")
    const menuItems = screen.getAllByRole('menuitem');
    await userEvent.click(dropdown);
    expect(menuItems.length).toBe(6)
  })
})
