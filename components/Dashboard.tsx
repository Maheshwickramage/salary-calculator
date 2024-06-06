import React from "react";
import CalculateSalary from "./CalculateSalary";
import Salary from "./Salary";
import { SalaryProvider } from "@/context/Context";

const Dashboard = () => {
  return (
    <div className="xl:h-screen flex justify-center mt-[80px] mb-[80px] xl:my-0 xl:items-center">
      <div className="flex flex-col  xl:flex-row xl:justify-between gap-6">
        <SalaryProvider>
          <CalculateSalary />
          <Salary />
        </SalaryProvider>
      </div>
    </div>
  );
};

export default Dashboard;
