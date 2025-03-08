import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBills } from "@/store/modules/billsSlice";

export const useMonthlyBillList = (YYMM) => {
  const dispatch = useDispatch();
  const [monthlyBillList, setMonthlyBillList] = useState([]);
  const { bills } = useSelector((state) => state.bills);

  useEffect(() => {
    dispatch(getBills("https://react-bill.vercel.app/api/db"));
  }, [dispatch]);

  useEffect(() => {
    setMonthlyBillList(bills.filter((bill) => bill.date.startsWith(YYMM)));
  }, [bills, YYMM]);

  return [monthlyBillList, setMonthlyBillList];
};
