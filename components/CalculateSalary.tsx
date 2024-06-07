"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSalary } from "../context/Context";
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
  } = useSalary();

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
    <div className="font-inter bg-bg-main lg:w-[680px] p-6 border border-bg-secondary rounded-lg ">
      <div className="flex justify-between items-center ">
        <h3 className="text-[32px] md:text-xl font-bold">
          Calculate Your Salary
        </h3>
        <div className="flex items-center gap-1" onClick={clearForm}>
          <Image src="/images/_Link.svg" alt="reset" width={66} height={40} />
        </div>
      </div>

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
                onClick={() => modifyIncome}
              >
                <Image
                  src="/images/edit.svg"
                  alt="edit"
                  width={32}
                  height={32}
                />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="p-[6px] bg-bg-secondary h-8 w-8 flex justify-center items-center rounded-full"
                onClick={() => removeIncome(income.id)}
              >
                <Image
                  src="/images/clear.svg"
                  alt="clear"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          </div>
        ))}

        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-[9px] mt-[26px]">
              <Image src="/images/add.svg" alt="add" width={162} height={40} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-white p-6 rounded-lg shadow-lg w-[492px] h-[auto]">
            <div className="flex flex-col gap-2">
              <input
                className="bg-white py-3 px-[15px] rounded outline-none border border-bg-secondary"
                type="text"
                placeholder="Pay Details"
                value={newIncome.description}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, description: e.target.value })
                }
              />
              <input
                className="bg-white py-3 px-[15px] rounded outline-none border border-bg-secondary"
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
                className="bg-secondary-color text-white py-2 px-4 rounded md:w-[132px]"
                onClick={handleAddIncome}
              >
                Add
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

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
              placeholder="Expense Details"
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
                onClick={() => modifyIncome}
              >
                <Image
                  src="/images/edit.svg"
                  alt="edit"
                  width={32}
                  height={32}
                />
              </button>
            </div>
            <div className="flex items-center gap-4 ">
              <button
                className="p-[6px] bg-bg-secondary h-8 w-8 flex justify-center items-center rounded-full"
                onClick={() => removeExpense(expense.id)}
              >
                <Image
                  src="/images/clear.svg"
                  alt="clear"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          </div>
        ))}

        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-[9px] mt-[26px]">
              <Image
                src="/images/deduct.svg"
                alt="deduct"
                width={162}
                height={40}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-white p-6 rounded-lg shadow-lg w-[492px] h-[auto]">
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
                className="bg-secondary-color text-white py-2 px-4 rounded md:w-[132px]"
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
