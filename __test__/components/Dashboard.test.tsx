import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "@/components/Dashboard";

describe("Dashboard page", () => {
  it("should render the dashboard page", () => {
    render(<Dashboard />);

    const dashboardElement = screen.getByText(/calculate your salary/i);
    expect(dashboardElement).toBeInTheDocument();
  });
});
