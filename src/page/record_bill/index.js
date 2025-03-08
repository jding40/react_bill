import React from "react";
import classNames from "classnames";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  setRecordType,
  setRecordUsage,
  setRecordNumber,
  setRecordDate,
  addBill,
} from "@/store/modules/billsSlice";
import { useDispatch, useSelector } from "react-redux";

const Record_bill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newBill, bills } = useSelector((state) => state.bills);
  return (
    <div className="flex flex-col justify-between w-full  px-3 h-full">
      <header className="h-fit">
        <h1 className="text-center text-xl font-bold p-2 relative">
          Record a bill
          {/* <Link to="/"> */}
          <span
            className="absolute material-symbols-outlined !text-3xl top-2 left-3"
            onClick={() => {
              navigate("/");
              dispatch(setRecordType("pay"));
            }}
          >
            arrow_back_ios
          </span>
          {/* </Link> */}
        </h1>

        <div className="flex justify-center gap-x-6 py-4 h-[60px] rounded-xl border-1 m-2 items-center">
          <span
            className={classNames(
              "border-1 rounded-s-xl rounded-e-xl w-[120px] p-2 h-fit text-center",
              { "bg-blue-600 text-white": newBill.type === "pay" }
            )}
          >
            <Link
              to="/record_bill"
              onClick={() => {
                dispatch(setRecordType("pay"));
                dispatch(setRecordUsage("Foods"));
                dispatch(
                  setRecordNumber(
                    newBill.money < 0 ? newBill.money : -newBill.money
                  )
                );
              }}
            >
              Expenditure
            </Link>
          </span>
          <span
            className={classNames(
              "border-1 rounded-s-xl rounded-e-xl w-[120px]  h-fit text-center p-2",
              { "bg-blue-600 text-white": newBill.type === "income" }
            )}
          >
            <Link
              to="/record_bill/income"
              onClick={() => {
                dispatch(setRecordType("income"));
                dispatch(setRecordUsage("Basic Salary"));
                dispatch(
                  setRecordNumber(
                    newBill.money > 0 ? newBill.money : -newBill.money
                  )
                );
              }}
            >
              Income
            </Link>
          </span>
        </div>
        <div className="relative flex">
          <input
            type="number"
            min={0}
            placeholder={(0.0).toFixed(2)}
            className="w-full border-1 rounded-xl py-2 px-10 text-right mx-2"
            value={newBill.type === "pay" ? -newBill.money : newBill.money}
            onChange={(e) =>
              dispatch(
                setRecordNumber(
                  newBill.type === "income"
                    ? Number(e.target.value)
                    : -Number(e.target.value)
                )
              )
            }
          />
          <input
            type="date"
            className="absolute top-2 left-4 flex-1"
            value={newBill.date}
            onChange={(e) => dispatch(setRecordDate(e.target.value))}
          />
          <span className="absolute top-2 right-10">$</span>
        </div>
      </header>
      <Outlet />

      <div
        className="h-[94px] border-2 text-center content-center rounded-t-xl text-2xl bg-blue-600 text-white"
        onClick={() => {
          console.log("bills.length(before):", bills.length);
          if (
            newBill.money === 0 ||
            !["pay", "income"].includes(newBill.type) ||
            newBill.date === "" ||
            newBill.useFor === ""
          ) {
            alert("Please fill in all the fields");
            return;
          }
          const newId =
            bills.reduce((cum, cur) => (cur.id > cum ? cur.id : cum), 0) + 1;
          const updatedNewBill = { ...newBill, id: newId };
          dispatch(addBill(updatedNewBill));
          console.log("newId", newId);
          console.log("newBill", newBill);
          console.log("bills(after):", bills);
          fetch("http://localhost:8888/ka", {
            method: "POST",
            body: JSON.stringify(updatedNewBill),
          });
          alert("Bill saved successfully");
        }}
      >
        Save
      </div>
    </div>
  );
};

export default Record_bill;
