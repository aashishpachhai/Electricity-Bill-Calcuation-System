import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

export const RecordReaing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const createBills = useMutation({
    mutationFn: (data) => {
      return axios.post("http://localhost:3000/bills", data);
    },
  });
  const onSubmit = (data: any) => {
    createBills.mutate({
      ...data,
      renter_id: selectedRenter,
      previous_reading: prevReading?.data?.current_reading,
      billing_month: selectedMonth,
    });
  };
  const { data: allRates } = useQuery({
    queryKey: ["getAllRenterName"],
    // refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/renter");
      return res.data;
    },
  });

  const { data: getRates } = useQuery({
    queryKey: ["getLatestRate"],
    // refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/rate/getRate");
      return res.data;
    },
  });

  const [selectedRenter, setSelectedRenter] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("Baisakh");
  const { data: prevReading } = useQuery({
    queryKey: ["getPrevReadingById", selectedRenter],
    enabled: Boolean(selectedRenter),
    // refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/bills/${selectedRenter}`,
      );
      return res.data;
    },
  });
  console.log(selectedRenter, "The selected renter");
  return (
    <div className=" flex p-2 w-screen justify-center items-center ">
      <form
        className="flex flex-col gap-4 w-[40%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl ">Record Reading</h1>
        <fieldset className="flex flex-col">
          <label htmlFor="">Month</label>
          <select
            name="renter"
            id=""
            className="border-gray-300 p-2 border rounded-md outline-none"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="Select a month" disabled selected>
              Select a month
            </option>
            <option value="Baisakh">Baisakh</option>;
            <option value="Jestha">Jestha</option>
            <option value="Asadh">Asadh</option>
            <option value="Shrawan">Shrawan</option>
            <option value="Bhadra">Bhadra</option>
            <option value="Aswin">Aswin</option>
            <option value="Kartik">Kartik</option>
            <option value="Mangsir">Mangsir</option>
            <option value="Poush">Poush</option>
            <option value="Magh">Magh</option>
            <option value="Falgun">Falgun</option>
            <option value="Chaitra">Chaitra</option>
          </select>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="">Renter</label>
          <select
            name="renter"
            id=""
            className="border-gray-300 p-2 border rounded-md outline-none"
            onChange={(e) => setSelectedRenter(Number(e.target.value))}
          >
            <option value="Select a renter" disabled selected>
              Select a renter
            </option>
            {allRates?.data.map((r: any) => {
              return <option value={r.id}>{r.name}</option>;
            })}
          </select>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="">Previous Reading</label>
          <input
            type="text"
            {...register("previous_reading")}
            defaultValue={prevReading?.data?.current_reading}
            disabled={Boolean(prevReading?.data?.current_reading)}
            className="border-gray-300 p-2 border rounded-md"
            placeholder="Enter rate per unit"
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="">Current Reading</label>
          <input
            type="text"
            {...register("current_reading")}
            className="border-gray-300 p-2 border rounded-md"
            placeholder="Enter rate per unit"
          />
        </fieldset>
        <div>
          <div className="w-full flex justify-between">
            <p>United Consumed</p>
            <p>
              {Math.abs(watch("previous_reading") - watch("current_reading"))}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p>Rate per unit</p>
            <p>{getRates?.data.rate_per_unit}</p>
          </div>
          <div className="w-full flex justify-between">
            <p>Amount to be paid</p>
            <p>
              NPR{" "}
              {Number(getRates?.data.rate_per_unit) *
                Math.abs(watch("previous_reading") - watch("current_reading"))}
            </p>
          </div>
        </div>
        <button className=" p-2 bg-green-300 text-white cursor-pointer">
          Add
        </button>
      </form>
    </div>
  );
};
