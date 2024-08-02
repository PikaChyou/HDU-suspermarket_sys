import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./Login.jsx";

import BackStage from "./backstage/Backstage.jsx";
import Emp from "./backstage/employee.jsx";
import New from "./backstage/new.jsx";
import Sche from "./backstage/schedule.jsx";
import Sells from "./backstage/sells.jsx";
import Return from "./backstage/return.jsx";
import Warehouse from "./backstage/warehouse.jsx";
import ScheHistory from "./backstage/scheduleHistory.jsx";
import Charts from "./backstage/charts.jsx";
import CurrentDate from "./backstage/currentDate.jsx";

import FrontStage from "./frontstage/Frontstage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="login"></Navigate>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/backstage",
    element: <BackStage />,
    errorElement: <p>Error occurred !</p>,
    children: [
      {
        path: "employee",
        element: <Emp />,
      },
      {
        path: "new",
        element: <New />,
      },
      {
        path: "schedule",
        element: <Sche />,
      },
      {
        path: "sells",
        element: <Sells />,
      },
      {
        path: "charts",
        element: <Charts />,
      },
      {
        path: "current",
        element: <CurrentDate />,
      },
      {
        path: "return",
        element: <Return />,
      },
      {
        path: "warehouse",
        element: <Warehouse />,
      },
      {
        path: "scheHistory",
        element: <ScheHistory />,
      },
    ],
  },
  {
    path: "/frontstage/:id",
    element: <FrontStage />,
  },
]);

export default router;
