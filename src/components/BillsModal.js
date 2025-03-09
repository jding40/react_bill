import { createPortal } from "react-dom";
import { useState } from "react";
import React from "react";
import { removeBill } from "@/store/modules/billsSlice";
import { useDispatch } from "react-redux";
import logoMap from "../data/logoMap";

const BillsModal = ({ bills, onClose, timeString, modalType }) => {
  const dispatch = useDispatch();
  const [localBills, setLocalBills] = useState(bills);
  return createPortal(
    <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-slate-200 p-4 rounded-xl w-[348px] md:w-[400px] ">
      <div className="flex justify-end  content-center items-center my-3 pb-2 border-b-2">
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded "
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="flex justify-between  my-3">
        <span className="font-bold">Time Period: {timeString}</span>
        <span className="material-symbols-outlined  !text-2xl text-blue-500">
          {logoMap[modalType]}
        </span>
      </div>
      {localBills.length > 0 && (
        <div className="flex justify-between mb-2">
          <span className="border-b-1 w-[30px]">ID</span>
          {timeString.length === 7 && (
            <span className="border-b-1 w-[90px]">Date</span>
          )}
          <span className="border-b-1 w-[70px]">Amount</span>
          <span className="border-b-1 w-[60px]">Deletion</span>
        </div>
      )}
      {localBills.length > 0 && (
        <ul>
          {localBills.map((bill) => (
            <li key={bill.id} className="flex justify-between ">
              <span className=" w-[30px]">{bill.id}</span>
              {timeString.length === 7 && (
                <span className="w-[90px]">{bill.date.slice(0, 10)}</span>
              )}
              <span className="w-[70px]">{bill.money.toFixed(2)}</span>
              <span
                className="material-symbols-outlined  text-red-600 cursor-pointer  !text-xl  w-[60px] text-right"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this bill?")
                  ) {
                    dispatch(removeBill(bill.id));
                    setLocalBills(
                      localBills.filter((item) => item.id !== bill.id)
                    );
                  }
                }}
              >
                delete
              </span>
            </li>
          ))}
        </ul>
      )}
      {localBills.length === 0 && <h1>No bills found</h1>}
    </div>,
    document.getElementById("modal-root")
  );
};

export default BillsModal;
