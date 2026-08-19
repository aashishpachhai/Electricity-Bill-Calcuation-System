import axios from "axios";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../common/table";
import { useState } from "react";
export const Renter = () => {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    columnHelper.display({
      header: "Action",
      cell: (info) => (
        <div className="flex gap-2">
          <div className="p-2 bg-green-400 text-white rounded-md cursor-pointer">
            Edit
          </div>
          <div className="p-2 bg-red-400 text-white rounded-md cursor-pointer">
            {" "}
            Delete
          </div>
        </div>
      ),
    }),
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="p-2 w-screen">
      <h1 className="text-3xl">Renters</h1>
      <div
        className={` ${showDialog ? "fixed" : "hidden"} fixed inset-0 flex justify-center items-center bg-black/50  bg-red `}
      >
        <div className="bg-white p-8 flex flex-col w-96">
          <div className="flex justify-between text-2xl my-4">
            <h1>Add Renter</h1>
            <button
              className="flex justify-end"
              onClick={() => setDialog(false)}
            >
              X
            </button>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset className="flex flex-col">
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                {...register("fullname")}
                className="border-gray-300 p-2 border rounded-md"
                placeholder="Enter Full Name"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="">Room Number</label>
              <input
                type="text"
                {...register("roomNo")}
                className="border-gray-300 p-2 border rounded-md"
                placeholder="Enter room number"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="">Email</label>
              <input
                type="text"
                {...register("email")}
                className="border-gray-300 p-2 border rounded-md"
                placeholder="Enter Email"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="Full Name">Phone</label>
              <input
                type="text"
                {...register("phoneNumber")}
                className="border-gray-300 p-2 border rounded-md"
                placeholder="Enter phone number"
              />
            </fieldset>

            <button
              type="submit"
              className=" p-2 bg-green-300 text-white cursor-pointer"
              onClick={() => setDialog(false)}
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-end my-4">
        <button
          onClick={() => setDialog(true)}
          className="cursor-pointer p-2 bg-black text-white rounded-lg px-4"
        >
          + Add
        </button>
      </div>
      <div className=" overflow-auto">
        <Table data={allRates?.data ?? []} columns={columns} />
      </div>
    </div>
  );
};
