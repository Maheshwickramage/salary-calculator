import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Page component", () => {
  it("should render the page with the dashboard", () => {
    render(<Page />);

    const dashboardElement = screen.getByText(/Calculate Your Salary/i);
    expect(dashboardElement).toBeInTheDocument();
  });
});
