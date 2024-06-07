import React from "react";
import { render, screen } from "@testing-library/react";
import CalculateSalary from "@/components/CalculateSalary";
import { SalaryProvider } from "@/context/Context"; 

describe("CalculateSalary component", () => {
  it("should render the calculate salary component", () => {
    render(
      <SalaryProvider>
        <CalculateSalary />
      </SalaryProvider>
    );

    const baseSalaryElement = screen.getByText(/Basic Salary/i);
    expect(baseSalaryElement).toBeInTheDocument();
  });
});
