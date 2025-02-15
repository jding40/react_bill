import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="flex justify-around py-3 border-2 text-center rounded-t-xl">
      <div className="w-fit ">
        <Link to="/" className="block">
          <span class="material-symbols-outlined block !text-4xl block">
            credit_card_gear
          </span>
          <br />
          Monthly Bills
        </Link>
      </div>
      <div className="w-fit ">
        <Link to="/record_bill" className="block">
          <span class="material-symbols-outlined block !text-4xl">
            receipt_long_off
          </span>
          <br />
          Record a Bill
        </Link>
      </div>
      <div className="w-fit px-2 text-center">
        <Link to="/yearly" className="block">
          <span class="material-symbols-outlined block !text-4xl">
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
