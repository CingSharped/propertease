import React from "react";
import { render } from "@testing-library/react";
import SignUpForm from ".";

describe("SignUpForm", () => {
    it("renders correctly", () => {
        const { container } = render(<SignUpForm />);
        expect(container).toMatchSnapshot();
        });
        });