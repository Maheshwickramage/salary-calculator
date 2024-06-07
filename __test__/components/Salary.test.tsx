import React from "react";
import { render, screen } from "@testing-library/react";
import Salary from "@/components/Salary";
import { SalaryProvider } from "@/context/Context"; // Ensure you provide the context

describe("Salary component", () => {
  it("should render the salary component with correct data", () => {
    render(
      <SalaryProvider>
        <Salary />
      </SalaryProvider>
    );

    const netSalaryElement = screen.getByText(/Net Salary/i);
    expect(netSalaryElement).toBeInTheDocument();
  });
});
