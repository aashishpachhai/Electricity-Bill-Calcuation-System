import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex ">
      <div className="w-80 bg-black text-white p-4 h-screen">
        <p className="text-white">Electricty Billing System</p>
        <section className="py-10 flex flex-col gap-4">
          {/* <p className="cursor-pointer p-2" onClick={() => navigate("/")}>
            Dashboard
          </p> */}
          <p className="cursor-pointer p-2" onClick={() => navigate("/renter")}>
            Renters
          </p>
          <p
            className="cursor-pointer p-2"
            onClick={() => navigate("/record-reading")}
          >
            Record Reading
          </p>
          <p
            className="cursor-pointer p-2"
            onClick={() => navigate("/history")}
          >
            History
          </p>
          <p className="cursor-pointer p-2" onClick={() => navigate("/rate")}>
            Rate
          </p>
        </section>
      </div>
      <Outlet />
    </div>
  );
};
