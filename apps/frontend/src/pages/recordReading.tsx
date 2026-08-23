import React from "react";
import { useForm } from "react-hook-form";

export const RecordReaing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className=" flex p-2 w-screen justify-center items-center ">
      <form
        className="flex flex-col gap-4 w-[40%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl ">Record Reading</h1>
        <fieldset className="flex flex-col">
          <label htmlFor="">Renter</label>
          <select
            name="renter"
            id=""
            className="border-gray-300 p-2 border rounded-md"
          >
            <option value="">Hello</option>
          </select>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="">Previous Reading</label>
          <input
            type="text"
            {...register("previous_reading")}
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
            <p>15</p>
          </div>
          <div className="w-full flex justify-between">
            <p>Amount to be paid</p>
            <p>
              NPR{" "}
              {15 *
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
