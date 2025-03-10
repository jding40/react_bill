import { createBrowserRouter } from "react-router-dom";
import Bill_ov from "../page/bill_overview";
import Recrod_bill from "../page/record_bill";
import Bill_ov_y from "../page/bill_overview_y";
import Bill_ov_m from "../page/bill_overview_m";
import RecordExpense from "../page/record_expense";
import RecordIncome from "../page/record_income";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Bill_ov />,
    children: [
      {
        index: true,
        element: <Bill_ov_m />,
      },
      { path: "yearly", element: <Bill_ov_y /> },
    ],
  },
  {
    path: "/record_bill",
    element: <Recrod_bill />,
    children: [
      {
        index: true,
        element: <RecordExpense />,
      },
      {
        path: "income",
        element: <RecordIncome />,
      },
    ],
  },
]);

export default router;
