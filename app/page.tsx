import React from "react";
import CalculateSalary from "./component/CalculateSalary";
import { SalaryProvider } from "./context/SalaryContext";
import Salary from "./component/Salary";

const page = () => {
  return (
    <main>
      <div className="xl:h-screen flex justify-center mt-[80px] mb-[80px] xl:my-0 xl:items-center">
      <div className="flex flex-col  xl:flex-row xl:justify-between gap-6">
        <SalaryProvider> 
          <CalculateSalary />
          <Salary/>
        </SalaryProvider>
      </div>
      </div>
    </main>
  );
};

export default page;
