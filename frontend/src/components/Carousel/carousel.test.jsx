import React, { useState } from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitFor, screen, render, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import Carousel from '.';

describe('carousel component', () => {
  // const [currentIndex, setCurrentIndex] = useState(0)

  const propertyImage = [
    "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/01/09/34/white-2563976_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg"
  ]
  
  beforeEach(() => {
    render(
      <Carousel propertyImage={propertyImage} />
    )
  })

  afterEach(() => {
    cleanup()
  })

  it('renders an image', () => {
    const carouselImage = screen.getAllByRole('slideshow-item').length
    expect(carouselImage).toBe(3)
  })
  
  it("renders a 'next' button", async() => {
    const nextImageButton = screen.getByRole('next-button')
    expect(nextImageButton).toBeInTheDocument()
    const one = await userEvent.click(nextImageButton)
  })

  it("does not render a 'previous' button when first image is displayed", async () => {
    await waitFor(()=>{
      expect(screen.getByRole('previous-button')).not.toBeInTheDocument()
    })
  })

  it("renders a 'previous' button when next button is clicked", async () => {
    const nextImageButton = screen.getByRole('next-button')
    await userEvent.click(nextImageButton)
    const previousImageButton = screen.getByRole('previous-button')
    expect(previousImageButton).toBeInTheDocument()
  })

})
