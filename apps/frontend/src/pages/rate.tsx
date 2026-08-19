import axios from "axios";
import { useMutation, useQuery } from "react-query";

import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../common/table";
import { useState } from "react";
import { useForm } from "react-hook-form";
export const Rate = () => {
  const columnHelper = createColumnHelper();
  const {
    data: allRates,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getAllRates"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/rate");
      return res.data;
    },
  });
  const [showDialog, setDialog] = useState(false);
  const createRate = useMutation({
    mutationFn: (data) => {
      return axios
        .post("http://localhost:3000/rate", data)
        .then(() => refetch());
    },
  });
  const deleteRate = useMutation({
    mutationFn: (data) => {
      return axios
        .delete(`http://localhost:3000/rate/${data}`)
        .then(() => refetch());
    },
  });
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
    columnHelper.accessor("rate_per_unit", {
      header: "Rate Per Unit",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("effective_from", {
      header: "Effective From",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      header: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <div
            className="p-2 bg-red-400 text-white rounded-md cursor-pointer"
            onClick={() => deleteRate.mutate(row.row.original.id)}
          >
            {" "}
            Delete
          </div>
        </div>
      ),
    }),
  ];

  const onSubmit = (data: any) => {
    console.log(data);
    createRate.mutate(data);
  };

  return (
    <div className=" w-screen p-4">
      <div
        className={` ${showDialog ? "fixed" : "hidden"} fixed inset-0 flex justify-center items-center bg-black/50  bg-red `}
      >
        <div className="bg-white p-8 flex flex-col w-96">
          <div className="flex justify-between text-2xl my-4">
            <h1>{"Add Rate"}</h1>
            <button
              className="flex justify-end"
              onClick={() => {
                setDialog(false);
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
              <label htmlFor="">Rate per unit</label>
              <input
                type="text"
                {...register("rate_per_unit")}
                className="border-gray-300 p-2 border rounded-md"
                placeholder="Enter rate per unit"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="">Effective From</label>
              <input
                type="date"
                {...register("effective_from")}
                className="border-gray-300 p-2 border rounded-md"
                placeholder="Enter room number"
              />
            </fieldset>

            <button
              className=" p-2 bg-green-300 text-white cursor-pointer"
              onClick={() => setDialog(false)}
            >
              Add
            </button>
          </form>
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
