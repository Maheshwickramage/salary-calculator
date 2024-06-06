"use client";
import React from "react";
import Image from "next/image";
import { useSalaryContext } from "../context/SalaryContext";

function CalculateSalary() {
  const {
    baseSalary,
    setBaseSalary,
    incomes,
    addIncome,
    modifyIncome,
    removeIncome,
    expenses,
    addExpense,
    modifyExpense,
    removeExpense,
    clearForm,
    totalSalary,
  } = useSalaryContext();

  const handleBaseSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseSalary(Number(e.target.value));
  };

  const handleAddIncome = () => {
    addIncome({ description: "", value: 0, epfEtfApplicable: false });
  };

  const handleAddExpense = () => {
    addExpense({ description: "", value: 0 });
  };

  return (
    <div className="font-inter bg-bg-main lg:w-[680px] p-6 border border-bg-secondary rounded-lg">
      <div className="flex justify-between items-center ">
        <h3 className="text-[16px] md:text-xl font-bold">
          Calculate Your Salary
        </h3>
        <button className="flex items-center gap-1" onClick={clearForm}>
          <Image
            src="/images/reset-icon.svg"
            alt="reset-icon"
            width={21}
            height={18}
          />
          <span className="text-secondary-color font-medium text-[14px]">
            Reset
          </span>
        </button>
      </div>

      {/* base salary */}
      <div className="mt-6">
        <p className="font-semibold">Basic Salary</p>
        <input
          className="bg-white w-full md:w-[356px] py-3 px-[15px] mt-2 rounded outline-none border border-bg-secondary"
          type="text"
          placeholder="150,000.00"
          value={baseSalary}
          onChange={handleBaseSalaryChange}
        />
      </div>

      {/* Incomes */}
      <div className="mt-6">
        <p className="font-semibold">Earnings</p>
        <p className="text-[12px] text-text-secondary mt-1">
          Allowance, Fixed Allowance, Bonus and etc.
        </p>

        {incomes.map((income) => (
          <div
            className="flex items-center gap-2 flex-col md:flex-row mt-2"
            key={income.id}
          >
            <input
              className="bg-white w-full md:w-[212px] py-3 px-[15px] rounded outline-none border border-bg-secondary"
              type="text"
              placeholder="Pay Details (Description)"
              value={income.description}
              onChange={(e) =>
                modifyIncome(income.id, { description: e.target.value })
              }
            />
            <input
              className="bg-white w-full md:w-[132px] py-3 px-[15px] rounded outline-none border border-bg-secondary"
              type="number"
              placeholder="Amount"
              value={income.value}
              onChange={(e) =>
                modifyIncome(income.id, { value: Number(e.target.value) })
              }
            />
            <label className="flex items-center gap-2 text-text-secondary text-[12px] w-full md:w-[132px]">
              <input
                type="checkbox"
                checked={income.epfEtfApplicable}
                onChange={() =>
                  modifyIncome(income.id, {
                    epfEtfApplicable: !income.epfEtfApplicable,
                  })
                }
              />
              EPF/ETF
            </label>
            <div className="flex items-center gap-4">
              <button
                className="p-[6px] bg-bg-secondary h-8 w-8 flex justify-center items-center rounded-full"
                onClick={() => removeIncome(income.id)}
              >
                <Image
                  src="/images/x-icon.svg"
                  alt="reset-icon"
                  width={12}
                  height={12}
                />
              </button>
            </div>
          </div>
        ))}

        <button
          className="flex items-center gap-[9px] mt-[26px]"
          onClick={handleAddIncome}
        >
          <Image
            src="/images/plus-icon.svg"
            alt="reset-icon"
            width={14}
            height={14}
          />
          <p className="text-[14px] font-medium text-secondary-color">
            Add New Allowance
          </p>
        </button>
      </div>

      {/* Expenses */}
      <div className="mt-6">
        <p className="font-semibold">Deductions</p>
        <p className="text-[12px] text-text-secondary mt-1">
          Tax, EPF, Loan and etc.
        </p>

        {expenses.map((expense) => (
          <div
            className="flex items-center gap-2 flex-col md:flex-row mt-2"
            key={expense.id}
          >
            <input
              className="bg-white w-full md:w-[212px] py-3 px-[15px] rounded outline-none border border-bg-secondary"
              type="text"
              placeholder="Expense Details (Description)"
              value={expense.description}
              onChange={(e) =>
                modifyExpense(expense.id, { description: e.target.value })
              }
            />
            <input
              className="bg-white w-full md:w-[132px] py-3 px-[15px] rounded outline-none border border-bg-secondary"
              type="number"
              placeholder="Amount"
              value={expense.value}
              onChange={(e) =>
                modifyExpense(expense.id, { value: Number(e.target.value) })
              }
            />
            <div className="flex items-center gap-4">
              <button
                className="p-[6px] bg-bg-secondary h-8 w-8 flex justify-center items-center rounded-full"
                onClick={() => removeExpense(expense.id)}
              >
                <Image
                  src="/images/x-icon.svg"
                  alt="reset-icon"
                  width={12}
                  height={12}
                />
              </button>
            </div>
          </div>
        ))}

        <button
          className="flex items-center gap-[9px] mt-[26px]"
          onClick={handleAddExpense}
        >
          <Image
            src="/images/plus-icon.svg"
            alt="reset-icon"
            width={14}
            height={14}
          />
          <p className="text-[14px] font-medium text-secondary-color">
            Add New Deduction
          </p>
        </button>
      </div>
      
    </div>
  );
}

export default CalculateSalary;
