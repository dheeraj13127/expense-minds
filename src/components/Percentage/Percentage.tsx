import React, { useState } from "react";

const Percentage = () => {
  const [formData, setFormData] = useState({
    startValue: 0,
    percentage: 0,
  });

  const [finalValue, setFinalValue] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };
  const handleCalculate = () => {
    const val = formData.startValue * (formData.percentage / 100);
    setFinalValue(val);
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-zinc-700 border-4 border-white p-8 rounded-lg shadow-lg w-96 space-y-4">
        <div className=" space-y-1">
          <label
            htmlFor="start_value"
            className=" text-white font-poppins text-sm"
          >
            Start Value
          </label>
          <input
            type="number"
            name="startValue"
            value={formData.startValue}
            onChange={handleChange}
            className=" w-full font-medium rounded py-1 outline-none px-2 font-poppins"
          />
        </div>
        <div className=" space-y-1">
          <label
            htmlFor="pecentage"
            className=" text-white font-poppins text-sm"
          >
            Percentage
          </label>
          <div className="flex items-center">
            <input
              type="number"
              className=" w-full font-medium rounded-tl rounded-bl  py-1 outline-none px-2 font-poppins"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
            />
            <span className="py-1 px-2 bg-gray-400 text-white rounded-tr rounded-br">
              %
            </span>
          </div>
        </div>
        <div className=" space-y-1">
          <label
            htmlFor="final_value"
            className=" text-white font-poppins text-sm"
          >
            Final Value
          </label>
          <div className=" w-full font-medium bg-white rounded py-1 outline-none px-2 font-poppins">
            {finalValue.toFixed(2)}
          </div>
        </div>
        <div className="">
          <button
            onClick={handleCalculate}
            className=" bg-blue-500 p-1 w-full mt-5 rounded-lg text-white hover:bg-opacity-80 duration-150"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Percentage;
