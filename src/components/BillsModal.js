import { createPortal } from "react-dom";
import { useState } from "react";
import React from "react";
import { removeBill } from "@/store/modules/billsSlice";
import { useDispatch } from "react-redux";

const BillsModal = ({ bills, onClose }) => {
  const dispatch = useDispatch();
  const [localBills, setLocalBills] = useState(bills);
  return createPortal(
    <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-slate-200 p-4 rounded-xl w-[348px] md:w-[400px] ">
      <div className="flex justify-between  content-center items-center mt-4">
        <h1 className="bg-white">Details:</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded "
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <ul>
        {localBills.map((bill) => (
          <li key={bill.id} className="flex justify-between gap-x-4">
            <span>{bill.id}</span>
            <span>{bill.date}</span>
            <span>{bill.money.toFixed(2)}</span>
            <span
              className="material-symbols-outlined  !text-3xl"
              onClick={() => {
                dispatch(removeBill(bill.id));
                setLocalBills(localBills.filter((item) => item.id !== bill.id));
              }}
            >
              close
            </span>
          </li>
        ))}
      </ul>
    </div>,
    document.getElementById("modal-root")
  );
};

export default BillsModal;
