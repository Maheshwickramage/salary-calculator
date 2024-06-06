"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSalaryContext } from "../context/Context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  const [newIncome, setNewIncome] = useState({
    description: "",
    value: 0,
    epfEtfApplicable: false,
  });
  const [newExpense, setNewExpense] = useState({ description: "", value: 0 });

  const handleBaseSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseSalary(Number(e.target.value));
  };

  const handleAddIncome = () => {
    addIncome(newIncome);
    setNewIncome({ description: "", value: 0, epfEtfApplicable: false });
  };

  const handleAddExpense = () => {
    addExpense(newExpense);
    setNewExpense({ description: "", value: 0 });
  };

  return (
    <div className="font-inter bg-bg-main lg:w-[680px] p-6 border border-bg-secondary rounded-lg">
      <div className="flex justify-between items-center ">
        <h3 className="text-[16px] md:text-xl font-bold">
          Calculate Your Salary
        </h3>
        <div className="flex items-center gap-1" onClick={clearForm}>
          <Image
            src="/images/reset-icon.svg"
            alt="reset-icon"
            width={21}
            height={18}
          />
          <span className="text-secondary-color font-medium text-[14px]">
            Reset
          </span>
        </div>
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

        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-[9px] mt-[26px]">
              <Image
                src="/images/plus-icon.svg"
                alt="reset-icon"
                width={14}
                height={14}
              />
              <p className="text-[14px] font-medium text-secondary-color">
                Add New Allowance
              </p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              <input
                className="bg-white py-3 px-[15px] rounded outline-none border border-bg-secondary"
                type="text"
                placeholder="Pay Details (Description)"
                value={newIncome.description}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, description: e.target.value })
                }
              />
              <input
                className="bg-white py-3 px-[15px] rounded outline-none border border-bg-secondary"
                type="number"
                placeholder="Amount"
                value={newIncome.value}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, value: Number(e.target.value) })
                }
              />
              <label className="flex items-center gap-2 text-text-secondary text-[12px]">
                <input
                  type="checkbox"
                  checked={newIncome.epfEtfApplicable}
                  onChange={() =>
                    setNewIncome({
                      ...newIncome,
                      epfEtfApplicable: !newIncome.epfEtfApplicable,
                    })
                  }
                />
                EPF/ETF
              </label>
              <button
                className="bg-secondary-color text-white py-2 px-4 rounded"
                onClick={handleAddIncome}
              >
                Add
              </button>
            </div>
          </PopoverContent>
        </Popover>
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

        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-[9px] mt-[26px]">
              <Image
                src="/images/plus-icon.svg"
                alt="reset-icon"
                width={14}
                height={14}
              />
              <p className="text-[14px] font-medium text-secondary-color">
                Add New Deduction
              </p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              <input
                className="bg-white py-3 px-[15px] rounded outline-none border border-bg-secondary"
                type="text"
                placeholder="Expense Details (Description)"
                value={newExpense.description}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
              />
              <input
                className="bg-white py-3 px-[15px] rounded outline-none border border-bg-secondary"
                type="number"
                placeholder="Amount"
                value={newExpense.value}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    value: Number(e.target.value),
                  })
                }
              />
              <button
                className="bg-secondary-color text-white py-2 px-4 rounded"
                onClick={handleAddExpense}
              >
                Add
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default CalculateSalary;
