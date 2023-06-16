import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitFor, screen, render, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import MaintenanceRequestList from '.';

describe('Maintenance request item', () => {
  const maintenanceCompletedRequest = [
    {
      "cost": 2000,
      "created_by": "6486fe5ad8920f8b400b20ef",
      "description": "The taps in the kitchen has been dripping for the past day",
      "location_id": "aeafvndoavbadv",
      "priority": "High",
      "property_id": "913rfquq",
      "status": false,
      "title": "Leaking tap",
      "work_type": "Repair"
      }
  ]

  beforeEach(() => {
    render(
      < MaintenanceRequestList request={maintenanceCompletedRequest}/>
    )
  })

  afterEach(() => {
    cleanup()
  })
  
  it('renders one maintenance request items', () => {
    const requestItems = document.getElementsByClassName('reqest-item')
    expect(requestItems).toBe(1)
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

  it('Displays a container to property details', () => {
    const td = document.getElementsByClassName('details-container');
    console.log(td)
    expect(td).toBeTruthy()
  })

  it('has a button', () => {
    const btn = document.querySelector('button');
    expect(btn).toBeTruthy()
  })
})
