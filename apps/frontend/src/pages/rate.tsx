import axios from "axios";
import { useQuery } from "react-query";

import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../common/table";
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
  console.log(allRates);
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
    <div className="p-2 w-screen">
      <h1 className="text-3xl">Rate</h1>
      <div className="flex justify-end my-4">
        <button
          onClick={() => console.log("Clicked Button")}
          className="cursor-pointer p-2 bg-black text-white rounded-lg px-4"
        >
          + Add
        </button>
      </div>
      <Table data={allRates?.data ?? []} columns={columns} />
    </div>
  );
};
