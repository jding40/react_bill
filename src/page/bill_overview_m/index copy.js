import React, { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getBills } from "@/store/modules/billsSlice";

const Bill_ov_m = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [expand, setExpand] = useState(false);
  const { bills } = useSelector((state) => state.bills);
  const monthRef = useRef(null);

  const pay = bills
    .filter(
      (bill) =>
        bill.type === "pay" &&
        bill.date.startsWith(year + "-" + String(month).padStart(2, "0"))
    )
    .reduce((acc, cur) => acc + cur.money, 0);

  const income = bills
    .filter(
      (bill) =>
        bill.type === "income" &&
        bill.date.startsWith(year + "-" + String(month).padStart(2, "0"))
    )
    .reduce((acc, cur) => acc + cur.money, 0);

  const balance = income + pay;

  const currentMonth = year + "-" + String(month).padStart(2, "0");

  console.log(currentMonth);
  const changeHandler = (e) => {
    const [y, m] = e.target.value.split("-");
    setYear(y);
    setMonth(m);
  };

  return (
    <div className="flex-auto border-2">
      <h1 className="text-center text-xl font-bold p-2">
        Bill Overview (Monthly)
      </h1>
      <div className="bg-amber-200 h-[120px] m-2 rounded-xl ">
        <div
          className="p-2 flex"
          onClick={() => {
            setExpand(!expand);
            if (monthRef.current) monthRef.current.showPicker();
          }}
        >
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

        <div className="p-2 flex gap-x-3 mx-3 text-center ">
          <div id="pay" className="w-[100px] border-1 rounded-xl bg-pink-200">
            <div>{pay}</div>
            <div className="font-bold">Pay</div>
          </div>
          <div
            id="income"
            className="w-[100px] border-1 rounded-xl bg-green-200"
          >
            <div>{income}</div>
            <div className="font-bold">Income</div>
          </div>
          <div
            id="balance"
            className="w-[100px] border-1 rounded-xl bg-sky-200"
          >
            <div>{balance}</div>
            <div className="font-bold">Balance</div>
          </div>
        </div>
      </div>
      {
        <div>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
      }
    </div>
  );
};

export default Bill_ov_m;
