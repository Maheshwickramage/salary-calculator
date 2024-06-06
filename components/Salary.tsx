"use client";
import React from "react";
import { useSalaryContext } from "../context/Context";

const Salary = () => {
  const { baseSalary, incomes, expenses, totalSalary } = useSalaryContext();

  const calculateTotalEarnings = () => {
    return incomes.reduce((total, income) => total + income.value, baseSalary);
  };

  const calculateGrossDeductions = () => {
    return expenses.reduce((total, expense) => total + expense.value, 0);
  };

  const calculateEmployeeEpf = () => {
    const applicableEarnings = incomes.filter(
      (income) => income.epfEtfApplicable
    );
    const totalApplicableEarnings = applicableEarnings.reduce(
      (total, income) => total + income.value,
      baseSalary
    );
    return totalApplicableEarnings * 0.08;
  };

  const calculateEmployerEpf = () => {
    const applicableEarnings = incomes.filter(
      (income) => income.epfEtfApplicable
    );
    const totalApplicableEarnings = applicableEarnings.reduce(
      (total, income) => total + income.value,
      baseSalary
    );
    return totalApplicableEarnings * 0.12;
  };

  const calculateEmployerEtf = () => {
    const applicableEarnings = incomes.filter(
      (income) => income.epfEtfApplicable
    );
    const totalApplicableEarnings = applicableEarnings.reduce(
      (total, income) => total + income.value,
      baseSalary
    );
    return totalApplicableEarnings * 0.03;
  };

  const calculateApit = () => {
    const grossEarnings = calculateTotalEarnings();
    let apit;

    switch (true) {
      case grossEarnings <= 100000:
        apit = 0;
        break;
      case grossEarnings <= 141667:
        apit = 0.06 * grossEarnings - 6000;
        break;
      case grossEarnings <= 183333:
        apit = 0.12 * grossEarnings - 14500;
        break;
      case grossEarnings <= 225000:
        apit = 0.18 * grossEarnings - 25500;
        break;
      case grossEarnings <= 266667:
        apit = 0.24 * grossEarnings - 39000;
        break;
      case grossEarnings <= 308333:
        apit = 0.3 * grossEarnings - 55000;
        break;
      case grossEarnings > 308333:
        apit = 0.36 * grossEarnings - 73500;
        break;
      default:
        apit = 0;
        break;
    }

    return apit;
  };

  const totalEarnings = calculateTotalEarnings();
  const grossDeductions = calculateGrossDeductions();
  const employeeEpf = calculateEmployeeEpf();
  const employerEpf = calculateEmployerEpf();
  const employerEtf = calculateEmployerEtf();
  const apit = calculateApit();
  const netSalary = totalEarnings - grossDeductions - employeeEpf - apit;
  const ctc = netSalary + employerEpf + employerEtf;

  return (
    <div className="font-inter bg-bg-main p-6 border border-bg-secondary rounded-lg w-[320px] md:w-[480px]">
      <h3 className="text-xl font-bold">Your Salary</h3>
      <div className="mt-6">
        <div className="flex justify-between">
          <p className="text-[14px] font-semibold text-text-secondary">Items</p>
          <p className="text-[14px] font-semibold text-text-secondary">
            Amount
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Basic Salary</p>
            <p>{baseSalary.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p>Total Earnings</p>
            <p>{totalEarnings.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p>Gross Deductions</p>
            <p>- {grossDeductions.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p>Employee EPF (8%)</p>
            <p>- {employeeEpf.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p>APIT</p>
            <p>- {apit.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col md:flex-row justify-between border border-bg-secondary rounded-[4px] p-4 mt-6">
            <p className="font-semibold">Net Salary (Take Home)</p>
            <p className="font-semibold">{netSalary.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[14px] font-semibold text-text-secondary">
            Contribution from the Employer
          </p>
          <div className="flex justify-between mt-3">
            <p>Employer EPF (12%)</p>
            <p>{employerEpf.toFixed(2)}</p>
          </div>

          <div className="flex justify-between mt-2">
            <p>Employer ETF (3%)</p>
            <p>{employerEtf.toFixed(2)}</p>
          </div>

          <div className="flex justify-between mt-8">
            <p>CTC (Cost to Company)</p>
            <p>{ctc.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
