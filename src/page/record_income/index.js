import React from "react";
import classNames from "classnames";
import billType from "../../data/billType";
import logoMap from "../../data/logoMap";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecordType,
  setRecordUsage,
  setRecordNumber,
  setRecordDate,
} from "@/store/modules/billsSlice";

const RecordIncome = () => {
  //console.log("billType is", Array.from(Object.entries(billType.income)));
  console.log("logo map is", logoMap);
  const dispatch = useDispatch();
  const { newBill } = useSelector((state) => state.bills);
  return (
    <div className="border-1 rounded-xl pt-5 px-2  mx-2 my-4 flex-1 overflow-y-auto scrollbar-hide bg-green-100">
      {Array.from(Object.entries(billType.income)).map(([key, value]) => {
        console.log(key, value);
        return (
          <div id={key} className="mb-4 ">
            <h1>
              <strong>{key}</strong>
            </h1>
            <div id={`${key}Group`} className="flex gap-x-4 flex-wrap">
              {value.map((type) => (
                <div
                  className={classNames(
                    "flex flex-col px-3 w-[160px] items-center ",
                    {
                      "text-blue-600": newBill.useFor === type,
                    }
                  )}
                  onClick={() => {
                    dispatch(setRecordUsage(type));
                  }}
                >
                  <span className="material-symbols-outlined  !text-3xl">
                    {logoMap[type]}
                  </span>
                  <span className="text-sm">{type}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* <div id="otherIncome">
        <h1>
          <strong>Other Income</strong>
        </h1>
        <div id="otherIncomeGroup" className="flex gap-x-4">
          <div className="flex flex-col px-3 items-center">
            <span className="material-symbols-outlined  !text-3xl">
              payments
            </span>
            <span>Financial Income</span>
          </div>
          <div className="flex flex-col px-3 items-center">
            <span className="material-symbols-outlined  !text-3xl">work</span>
            <span className="">Gifts</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default RecordIncome;
