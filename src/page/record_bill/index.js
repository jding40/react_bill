import React from "react";
import Menu from "@/components/Menu";

const Record_bill = () => {
  return (
    <div className="flex flex-col justify-between w-full  bg-sky-200 px-3 h-full">
      <main className="border-green-500 border-1 flex-auto">
        <h1 className="text-center text-xl font-bold p-2 border-1">
          Record a bill
        </h1>
      </main>
      <Menu />
    </div>
  );
};

export default Record_bill;
