import axios from "axios";
import { useQuery } from "react-query";

import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../common/table";
import { useState } from "react";
export const Rate = () => {
  const columnHelper = createColumnHelper();
  const {
    data: allRates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getAllRates"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/renter");
      return res.data;
    },
  });
  const [showDialog, setDialog] = useState(false);
  // const data = [
  //   { id: 1, firstName: "John", lastName: "Doe", age: 28 },
  //   { id: 2, firstName: "Jane", lastName: "Smith", age: 34 },
  //   { id: 3, firstName: "Bob", lastName: "Johnson", age: 42 },
  // ];

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Full Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("room_number", {
      header: "Room Number",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <div className=" w-screen p-4">
      <div
        className={` ${showDialog ? "fixed" : "hidden"} fixed inset-0 flex justify-center items-center bg-black/50  bg-red `}
      >
        <div className="bg-white p-8 flex flex-col w-96">
          <button className="flex justify-end" onClick={() => setDialog(false)}>
            X
          </button>
          <div className="flex flex-col gap-4">
            <fieldset className="flex flex-col">
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                className="border-gray-300 p-2 border rounded-md"
                placeholder="Enter Full Name"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="">Room Number</label>
              <input
                type="text"
                className="border-gray-300 p-2 border rounded-md"
                placeholder="Enter room number"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="border-gray-300 p-2 border rounded-md"
                placeholder="Enter Email"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="Full Name">Phone</label>
              <input
                type="text"
                className="border-gray-300 p-2 border rounded-md"
                placeholder="Enter phone number"
              />
            </fieldset>

            <button
              className=" p-2 bg-green-300 text-white cursor-pointer"
              onClick={() => setDialog(true)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-3xl">Rate</h1>
      <div className="flex justify-end my-4">
        <button
          onClick={() => setDialog(true)}
          className="cursor-pointer p-2 bg-black text-white rounded-lg px-4"
        >
          + Add
        </button>
      </div>
      <Table data={allRates?.data ?? []} columns={columns} />
    </div>
  );
};
