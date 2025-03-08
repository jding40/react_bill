import React from "react";
import classNames from "classnames";

import {
  setRecordType,
  setRecordUsage,
  setRecordNumber,
  setRecordDate,
} from "@/store/modules/billsSlice";
import { useDispatch, useSelector } from "react-redux";

const RecordExpense = () => {
  const dispatch = useDispatch();
  const { newBill } = useSelector((state) => state.bills);
  return (
    <div className="border-1 rounded-xl py-2 px-2  mx-2 my-4 overflow-y-auto scrollbar-hide flex-1 bg-slate-200">
      <div id="dining" className="mb-4">
        <h1>
          <strong>Dining</strong>
        </h1>
        <div id="diningGroup" className="flex gap-x-4">
          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Foods",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Foods"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">
              restaurant
            </span>
            <span>Foods</span>
          </div>

          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Drinks",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Drinks"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">coffee</span>
            <span>Drinks</span>
          </div>

          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Desserts",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Desserts"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">
              icecream
            </span>
            <span>Desserts</span>
          </div>
        </div>
      </div>
      <div id="transport" className="mb-4">
        <h1>
          <strong>Transport</strong>
        </h1>
        <div id="transportGroup" className="flex gap-x-4">
          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Taxi",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Taxi"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">
              local_taxi
            </span>
            <span>Taxi</span>
          </div>
          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Fuel",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Fuel"));
            }}
          >
            <span className="material-symbols-outlined !text-3xl">
              local_gas_station
            </span>
            <span className="">Fuel</span>
          </div>
          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Parking",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Parking"));
            }}
          >
            <span className="material-symbols-outlined !text-3xl">
              local_parking
            </span>
            <span className="">Parking</span>
          </div>
        </div>
      </div>
      <div id="entertainment" className="mb-4">
        <h1>
          <strong>Entertainment</strong>
        </h1>
        <div id="entertainmentGroup" className="flex gap-x-4">
          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Gym",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Gym"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">
              fitness_center
            </span>
            <span>Gym</span>
          </div>

          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Games",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Games"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">
              sports_esports
            </span>
            <span>Games</span>
          </div>

          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1":
                newBill.useFor === "Music & Movie",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Music & Movie"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">
              play_circle
            </span>
            <span>Movie</span>
          </div>

          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Tours",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Tours"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">
              travel_explore
            </span>
            <span className="">Tours</span>
          </div>
        </div>
      </div>
      <div id="dailyExpense">
        <h1>
          <strong>Daily Expense</strong>
        </h1>
        <div id="dailyExpenseGroup" className="flex gap-x-4">
          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Books",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Books"));
            }}
          >
            <span className="material-symbols-outlined !text-3xl">
              menu_book
            </span>
            <span>Books</span>
          </div>
          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1":
                newBill.useFor === "Education",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Education"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">school</span>
            <span className="">Education</span>
          </div>
          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1":
                newBill.useFor === "Furniture",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Furniture"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">chair</span>
            <span className="">Furniture</span>
          </div>
          <div
            className={classNames("flex flex-col px-3 items-center w-[80px]", {
              "text-green-500 relative bottom-1": newBill.useFor === "Others",
            })}
            onClick={() => {
              dispatch(setRecordUsage("Others"));
            }}
          >
            <span className="material-symbols-outlined  !text-3xl">
              other_admission
            </span>
            <span className="">Others</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordExpense;
