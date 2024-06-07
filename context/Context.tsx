"use client";
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

type Income = {
  id: number;
  description: string;
  value: number;
  epfEtfApplicable: boolean;
};

type Expense = {
  id: number;
  description: string;
  value: number;
};

type SalaryContextProps = {
  baseSalary: number;
  incomes: Income[];
  expenses: Expense[];
  totalSalary: number;
  setBaseSalary: (salary: number) => void;
  addIncome: (income: Omit<Income, "id">) => void;
  modifyIncome: (id: number, income: Partial<Income>) => void;
  removeIncome: (id: number) => void;
  addExpense: (expense: Omit<Expense, "id">) => void;
  modifyExpense: (id: number, expense: Partial<Expense>) => void;
  removeExpense: (id: number) => void;
  clearForm: () => void;
};

const SalaryContext = createContext<SalaryContextProps | undefined>(undefined);

export const useSalaryContext = () => {
  const context = useContext(SalaryContext);
  if (!context) {
    throw new Error("A SalaryProvider must utilize useSalaryContext.");
  }
  return context;
};

type SalaryProviderProps = {
  children: ReactNode;
};

export const SalaryProvider = ({ children }: SalaryProviderProps) => {
  const [baseSalary, setBaseSalary] = useState<number>(0);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalSalary, setTotalSalary] = useState<number>(0);

  const addIncome = (income: Omit<Income, "id">) => {
    setIncomes((prev) => [...prev, { id: Date.now(), ...income }]);
  };

  const modifyIncome = (id: number, updatedIncome: Partial<Income>) => {
    setIncomes((prev) =>
      prev.map((income) =>
        income.id === id ? { ...income, ...updatedIncome } : income
      )
    );
  };

  const removeIncome = (id: number) => {
    setIncomes((prev) => prev.filter((income) => income.id !== id));
  };

  const addExpense = (expense: Omit<Expense, "id">) => {
    setExpenses((prev) => [...prev, { id: Date.now(), ...expense }]);
  };

  const modifyExpense = (id: number, updatedExpense: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
  };

  const removeExpense = (id: number) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const clearForm = () => {
    setBaseSalary(0);
    setIncomes([]);
    setExpenses([]);
  };

  const calculateTotalSalary = () => {
    let epfEtfAmount = incomes
      .filter((income) => income.epfEtfApplicable)
      .reduce((acc, income) => acc + income.value, 0);

    let totalEarnings = incomes.reduce((acc, income) => acc + income.value, 0);
    let totalDeductions = expenses.reduce((acc, expense) => acc + expense.value, 0);

    // Calculate final salary
    let finalSalary = baseSalary + totalEarnings - totalDeductions - epfEtfAmount;

    setTotalSalary(finalSalary);
  };

  useEffect(() => {
    calculateTotalSalary();
  }, [baseSalary, incomes, expenses]);

  return (
    <SalaryContext.Provider
      value={{
        baseSalary,
        incomes,
        expenses,
        totalSalary,
        setBaseSalary,
        addIncome,
        modifyIncome,
        removeIncome,
        addExpense,
        modifyExpense,
        removeExpense,
        clearForm,
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};
