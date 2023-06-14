import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitFor, screen, render, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import MaintenanceRequestList from '.';

describe('Maintenance request item', () => {
  const maintenanceRequest = [
    {"issue":"Leaking tap",
    "location": "42 Panda Road",
    "description": "bathroom tap leaking",
    "completed": false},
    {"issue":"hot water not working",
    "location": "42 Panda land",
    "description": "no hot water in kitchen",
    "completed": true}
  ]

  beforeEach(() => {
    render(
      < MaintenanceRequestList maintenanceRequest={maintenanceRequest} />
    )
  })

  afterEach(() => {
    cleanup()
  })
  
  it('renders two maintenance request items', () => {
    const requestItems = screen.getAllByRole('reqest-item').length
    expect(requestItems).toBe(2)
  })
  
  it("renders a one completed item", () => {
    const completedRequestItem = document.getElementsByClassName('maintenance-request-item-completed')
    expect(completedRequestItem).toBeInTheDocument()
  })

  it("renders a 'completed' button", async() => {
    const completedImageButton = screen.getByRole('complete-btn')
    expect(completedImageButton).toBeInTheDocument()
  })

  it("renders a 'delete' button", async() => {
    const completedImageButton = screen.getByRole('delete-btn')
    expect(completedImageButton).toBeInTheDocument()
  })

})
