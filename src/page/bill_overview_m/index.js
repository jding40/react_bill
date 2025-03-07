import { set } from "date-fns";
import React, { useState, useRef, useEffect, useMemo } from "react";

import BillCard from "@/components/BillCard";

import { useSelector } from "react-redux";
import { useMonthlyBillList } from "@/hooks/useBillList";

const Bill_ov_m = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [expand, setExpand] = useState(false);
  const { bills } = useSelector((state) => state.bills);
  const monthRef = useRef(null);

  // const monthlyBills = bills.filter((bill) =>
  //   bill.date.startsWith(year + "-" + String(month).padStart(2, "0"))
  // );

  const pay = bills
    .filter(
      (bill) =>
        bill.type === "pay" &&
        bill.date.startsWith(year + "-" + String(month).padStart(2, "0"))
    )
    .reduce((acc, cur) => acc + cur.money, 0);

  // const pay = useMemo(
  //   () =>
  //     bills
  //       .filter(
  //         (bill) =>
  //           bill.type === "pay" &&
  //           bill.date.startsWith(year + "-" + String(month).padStart(2, "0"))
  //       )
  //       .reduce((acc, cur) => acc + cur.money, 0),
  //   [bills, year, month]
  // );

  const income = bills
    .filter(
      (bill) =>
        bill.type === "income" &&
        bill.date.startsWith(year + "-" + String(month).padStart(2, "0"))
    )
    .reduce((acc, cur) => acc + cur.money, 0);

  const balance = income + pay;

  const currentMonth = year + "-" + String(month).padStart(2, "0");

  const [monthlyBills, setMonthlyBills] = useMonthlyBillList(currentMonth);

  const getDailyBills = (day) =>
    monthlyBills.filter((bill) =>
      bill.date.startsWith(
        year +
          "-" +
          String(month).padStart(2, "0") +
          "-" +
          String(day).padStart(2, "0")
      )
    );

  const getDailyPay = (day) =>
    getDailyBills(day)
      .filter((bill) => bill.type === "pay")
      .reduce((acc, cur) => acc + cur.money, 0);
  const getDailyIncome = (day) =>
    getDailyBills(day)
      .filter((bill) => bill.type === "income")
      .reduce((acc, cur) => acc + cur.money, 0);

  console.log(currentMonth);
  const changeHandler = (e) => {
    const [y, m] = e.target.value.split("-").map(Number);
    setYear(y);
    setMonth(m);
    setExpand(false);
  };

  // useEffect(() => {
  //   if (expand && monthRef.current) {
  //     monthRef.current.focus(); // 先聚焦到输入框
  //     monthRef.current.showPicker();
  //   }
  // }, [expand]); // 依赖 expand，确保在展开时执行 showPicker

  const reduceMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else setMonth(month - 1);
  };
  const addMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else setMonth(month + 1);
  };
  const reduceYear = () => {
    setYear(year - 1);
  };
  const addYear = () => {
    setYear(year + 1);
  };

  return (
    <div className="flex-1  mb-4 w-full  flex flex-col overflow-y-auto ">
      <h1 className="text-center text-xl font-bold p-2 h-fit">
        Bill Overview (Monthly)
      </h1>
      <div className="bg-amber-200 h-[120px] m-2 rounded-xl ">
        <div className="p-2 flex" onClick={() => setExpand(!expand)}>
          <span className="px-3 text-lg font-bold ">
            Bill of {year} / {String(month).padStart(2, "0")}
          </span>
          {!expand && (
            <span className="material-symbols-outlined  !text-2xl">
              stat_minus_1
            </span>
          )}
          {expand && (
            <span className="material-symbols-outlined !text-2xl">stat_1</span>
          )}
        </div>

        <div className="py-2 flex  mx-3 text-center justify-evenly md:justify-start md:gap-x-16 md:px-16">
          <div id="pay" className="w-[100px] border-1 rounded-xl bg-pink-200">
            <div>{pay.toFixed(2)}</div>
            <div className="font-bold">Pay</div>
          </div>
          <div
            id="income"
            className="w-[100px] border-1 rounded-xl bg-green-200"
          >
            <div>{income.toFixed(2)}</div>
            <div className="font-bold">Income</div>
          </div>
          <div
            id="balance"
            className="w-[100px] border-1 rounded-xl bg-sky-200"
          >
            <div>{balance.toFixed(2)}</div>
            <div className="font-bold">Balance</div>
          </div>
        </div>
      </div>
      {expand && (
        <div className="mx-3 px-2 flex gap-x-3 md:gap-x-16 xl:gap-x-20  items-center justify-around md:justify-start h-fit">
          <span
            className="material-symbols-outlined  !text-3xl "
            onClick={() => reduceYear()}
          >
            stat_2
          </span>
          <span
            className="material-symbols-outlined  !text-3xl "
            onClick={() => reduceMonth()}
          >
            stat_1
          </span>
          <input
            className=" border border-gray-300 rounded-lg px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="month"
            id="monthRef"
            min="2020-01"
            max={
              new Date().getFullYear() +
              "-" +
              String(new Date().getMonth() + 1).padStart(2, "0")
            }
            ref={monthRef}
            value={currentMonth}
            onChange={(e) => changeHandler(e)}
          />
          <span
            className="material-symbols-outlined  !text-3xl "
            onClick={() => addMonth()}
          >
            stat_minus_1
          </span>
          <span
            className="material-symbols-outlined  !text-3xl "
            onClick={() => addYear()}
          >
            stat_minus_2
          </span>
        </div>
      )}
      {/* <div>
        {monthlyBills.map((bill) => (
          <li key={bill.id}>{bill.money}</li>
        ))}
      </div> */}
      <div className="w-full mt-2  overflow-y-auto scrollbar-hide flex-1 border-2 rounded-b-2xl">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
          let timeString =
            year +
            "-" +
            String(month).padStart(2, "0") +
            "-" +
            String(day).padStart(2, "0");

          if (getDailyBills(day).length > 0) {
            return (
              <BillCard
                key={timeString}
                billList={getDailyBills(day)}
                timeString={timeString}
                pay={getDailyPay(day)}
                income={getDailyIncome(day)}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Bill_ov_m;
