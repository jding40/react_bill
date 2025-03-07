import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { setActiveRoute } from "@/store/modules/billsSlice";
import { useLocation } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();
  const { bills, activeRoute } = useSelector((state) => state.bills);
  const location = useLocation(); // 使用 useLocation 获取当前路径
  //const history = useHistory();
  console.log(location);

  useEffect(() => {
    // 根据路由地址更新 activeRoute
    if (location.pathname === "/") {
      dispatch(setActiveRoute("monthlyBill"));
    } else if (location.pathname === "/yearly") {
      dispatch(setActiveRoute("yearlyBill"));
    } else if (location.pathname === "/record_bill") {
      dispatch(setActiveRoute("recordBill"));
    }
  }, [location.pathname]);

  return (
    <div className="flex justify-around py-3 border-2 text-center rounded-t-xl">
      <div className="w-fit ">
        <Link
          to="/"
          className={classNames("block", {
            "text-green-500": activeRoute === "monthlyBill",
          })}
          onClick={() => dispatch(setActiveRoute("monthlyBill"))}
        >
          <span className="material-symbols-outlined block !text-4xl block">
            credit_card_gear
          </span>
          <br />
          Monthly Bills
        </Link>
      </div>
      <div className="w-fit ">
        <Link
          to="/record_bill"
          className={classNames("block", {
            "text-green-500": activeRoute === "recordBill",
          })}
        >
          <span className="material-symbols-outlined block !text-4xl">
            receipt_long_off
          </span>
          <br />
          Record a Bill
        </Link>
      </div>
      <div className="w-fit px-2 text-center">
        <Link
          to="/yearly"
          className={classNames("block", {
            "text-green-500": activeRoute === "yearlyBill",
          })}
        >
          <span className="material-symbols-outlined block !text-4xl">
            price_change
          </span>
          <br />
          Yearly Bills
        </Link>
      </div>
    </div>
  );
};

export default Menu;
