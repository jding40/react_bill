import React from "react";
import { Link, Outlet } from "react-router-dom";
import Menu from "@/components/Menu";

const Bill_ov = () => {
  return (
    <div className="flex flex-col justify-between w-full  bg-sky-200 px-3 h-full">
      <Outlet />
      <Menu />
    </div>
  );
};

export default Bill_ov;
