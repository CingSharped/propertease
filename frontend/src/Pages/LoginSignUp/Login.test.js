import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renders login form correctly", () => {
    const { getByText } = render(<LoginForm />);
    const loginButton = getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });
});
