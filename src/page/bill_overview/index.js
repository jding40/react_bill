import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Menu from "@/components/Menu";
import { useSelector, useDispatch } from "react-redux";
import { getBills } from "@/store/modules/billsSlice";

const Bill_ov = () => {
  const dispatch = useDispatch();
  const { bills, activeRoute } = useSelector((state) => state.bills);
  console.log("bills is", bills);
  useEffect(() => {
    console.log("useEffect is called");
    dispatch(getBills("https://coca-portfolio.vercel.app/api/db"));
  }, []);
  console.log("bills after useEffect is", bills);
  return (
    <div className="flex flex-col justify-between w-full  px-3 h-full bg-gray-100">
      <Outlet />
      {/* <div
        className="border-green-500 border-1 h-full overflow-y-auto scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {bills.map((bill, index) => (
          <li key={index}>{bill.money}</li>
        ))}
      </div> */}
      <Menu />
    </div>
  );
};

export default Bill_ov;
