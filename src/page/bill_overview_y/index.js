import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BillCard from "@/components/BillCard";

const Bill_ov_y = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  console.log("year is", year);
  const { bills } = useSelector((state) => state.bills);
  console.log("bills is", bills);

  const yearlyBills = bills.filter((bill) => bill.date.startsWith(year));
  const yearlyPay = yearlyBills.reduce((acc, cur) => {
    if (cur.money < 0) return acc + cur.money;
    else return acc;
  }, 0);

  console.log("yearlyPay is", yearlyPay);
  const yearlyIncome = yearlyBills.reduce((acc, cur) => {
    if (cur.money > 0) return acc + cur.money;
    else return acc;
  }, 0);

  return (
    <div className="flex-1 border-2 mb-4 rounded-b-xl w-full border-2 border-green-500 flex flex-col overflow-y-auto">
      <h1 className="text-center text-md lg:text-xl 2xl:text-2xl font-bold p-2 border-1 flex justify-around">
        <span
          className="material-symbols-outlined  !text-3xl"
          onClick={() => setYear(year - 1)}
        >
          keyboard_arrow_up
        </span>
        <span>{year} Bill Overview (Yearly)</span>
        <span
          className="material-symbols-outlined  !text-3xl"
          onClick={() => setYear(year + 1)}
        >
          keyboard_arrow_down
        </span>
      </h1>

      <div className="py-2 flex  mx-3 text-center justify-evenly md:justify-start md:gap-x-16 md:px-16">
        <div id="pay" className="w-[100px] border-1 rounded-xl bg-pink-200">
          <div>{yearlyPay.toFixed(2)}</div>
          <div className="font-bold">Pay</div>
        </div>
        <div id="income" className="w-[100px] border-1 rounded-xl bg-green-200">
          <div>{yearlyIncome.toFixed(2)}</div>
          <div className="font-bold">Income</div>
        </div>
        <div id="balance" className="w-[100px] border-1 rounded-xl bg-sky-200">
          <div>{(yearlyIncome + yearlyPay).toFixed(2)}</div>
          <div className="font-bold">Balance</div>
        </div>
      </div>
      <div className="w-full mt-2  overflow-y-auto scrollbar-hide flex-1 rounded-t-2xl">
        {/* billList, timeString, pay, income */}
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
          const timeString = `${year}-${String(month).padStart(2, "0")}`;
          const monthlyBills = yearlyBills.filter((bill) =>
            bill.date.startsWith(timeString)
          );
          const pay = monthlyBills.reduce((acc, cur) => {
            if (cur.money < 0) return acc + cur.money;
            else return acc;
          }, 0);
          const income = monthlyBills.reduce((acc, cur) => {
            if (cur.money > 0) return acc + cur.money;
            else return acc;
          }, 0);
          return (
            monthlyBills.length > 0 && (
              <BillCard
                key={month}
                billList={monthlyBills}
                timeString={timeString}
                pay={pay}
                income={income}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Bill_ov_y;
