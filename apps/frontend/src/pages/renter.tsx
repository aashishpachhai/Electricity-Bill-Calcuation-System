import axios from "axios";
import { useMutation, useQuery } from "react-query";
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
    refetch,
  } = useQuery({
    queryKey: ["getAllRenter"],
    // refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/renter");
      return res.data;
    },
  });
  const [showDialog, setDialog] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createRenter = useMutation({
    mutationFn: (data) => {
      return axios
        .post("http://localhost:3000/renter", data)
        .then(() => refetch());
    },
  });
  const deleteRenter = useMutation({
    mutationFn: (data) => {
      return axios
        .delete(`http://localhost:3000/renter/${data}`)
        .then(() => refetch());
    },
  });
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
      cell: (row) => (
        <div className="flex gap-2">
          <div
            className="p-2 bg-green-400 text-white rounded-md cursor-pointer"
            onClick={() => {
              setEdit(true);
              setDialog(true);
            }}
          >
            Edit
          </div>
          <div
            className="p-2 bg-red-400 text-white rounded-md cursor-pointer"
            onClick={() => deleteRenter.mutate(row.row.original.id)}
          >
            {" "}
            Delete
          </div>
        </div>
      ),
    }),
  ];

  const onSubmit = (data: any) => {
    createRenter.mutate(data);
  };

  return (
    <div className="p-2 w-screen">
      <h1 className="text-3xl">Renters</h1>
      <div
        className={` ${showDialog ? "fixed" : "hidden"} fixed inset-0 flex justify-center items-center bg-black/50  bg-red `}
      >
        <div className="bg-white p-8 flex flex-col w-96 rounded-md">
          <div className="flex justify-between text-2xl my-4">
            <h1>{isEdit ? "Edit Renter" : "Add Renter"}</h1>
            <button
              className="flex justify-end"
              onClick={() => {
                setDialog(false);
                setEdit(false);
              }}
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
                {...register("name")}
                className="border-gray-300 p-2 border rounded-md outline-none"
                placeholder="Enter Full Name"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="">Room Number</label>
              <input
                type="text"
                {...register("room_number")}
                className="border-gray-300 p-2 border rounded-md outline-none"
                placeholder="Enter room number"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="">Email</label>
              <input
                type="text"
                {...register("email")}
                className="border-gray-300 p-2 border rounded-md outline-none"
                placeholder="Enter Email"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="Full Name">Phone</label>
              <input
                type="text"
                {...register("phone")}
                className="border-gray-300 p-2 border rounded-md outline-none"
                placeholder="Enter phone number"
              />
            </fieldset>
            {isEdit && (
              <fieldset className="flex flex-col">
                <label htmlFor="">Status</label>
                <select
                  name="status"
                  className="border-gray-300 p-2 border rounded-md outline-none"
                >
                  <option value="">Active</option>
                  <option value="">Inactive</option>
                </select>
              </fieldset>
            )}

            <button
              type="submit"
              className=" p-2 bg-green-300 text-white cursor-pointer"
              onClick={() => {
                setDialog(false);
                setEdit(false);
              }}
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
