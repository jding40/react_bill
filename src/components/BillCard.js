import React, { useState } from "react";
import classNames from "classnames";
import { set } from "date-fns";
import logoMap from "../data/logoMap";

const BillCard = ({ billList, timeString, pay, income }) => {
  const [expand, setExpand] = useState(false);
  console.log(`bill list for ${timeString} is`, billList);

  const groupedAmount = billList.reduce((acc, bill) => {
    acc[bill.useFor] = acc[bill.useFor]
      ? acc[bill.useFor] + bill.money
      : bill.money;
    return acc;
  }, {});

  // const logoMap = {
  //   drinks: "coffee",
  //   longdistance: "social_distance",
  //   bonus: "heart_minus",
  //   dessert: "cookie",
  //   travel: "flight_takeoff",
  //   salary: "account_balance_wallet",
  //   food: "lunch_dining",
  //   games: "sports_esports",
  //   taxi: "local_taxi",
  //   promote: "place_item",
  //   "music & movie": "live_tv",
  //   education: "school",
  //   others: "other_admission",
  // };

  const clickHandler = () => {
    setExpand(!expand);
  };
  return (
    <div className=" rounded-xl bg-teal-200 p-2 m-2 border-2">
      <div className="mt-1 mb-3 flex justify-between">
        <strong className="">{timeString}</strong>
        <div onClick={clickHandler}>
          {expand && (
            <span className="material-symbols-outlined  !text-2xl">
              stat_minus_1
            </span>
          )}
          {!expand && (
            <span className="material-symbols-outlined  !text-2xl">stat_1</span>
          )}
        </div>
      </div>
      <div className="flex gap-x-3 w-full ">
        <span className="w-[165px]  text-red-600">
          <strong className="">Expenditure:</strong> {pay.toFixed(2)}
        </span>
        <span className="w-[130px]  text-green-600">
          <strong>Income:</strong> {income.toFixed(2)}
        </span>
        <span
          id="balanceSpan"
          className={classNames("w-[150px]", {
            "text-red-600": pay + income < 0,
            "text-green-600": pay + income >= 0,
          })}
        >
          <strong>Balance:</strong> {(pay + income).toFixed(2)}
        </span>
      </div>
      <div className={classNames("mt-2 w-[450px]", { "border-t-1": expand })}>
        {expand &&
          Object.entries(groupedAmount).map(([key, value]) => (
            <div key={key} className="flex justify-between p-1">
              <div className="flex gap-x-4">
                <span className="material-symbols-outlined block !text-2xl">
                  {logoMap[key]}
                </span>
                <span>{key} :</span>
              </div>
              <span>{value.toFixed(2)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BillCard;

//为什么span元素的hidden类名没有生效？
