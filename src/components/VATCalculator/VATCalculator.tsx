import React, { useState } from "react";

const VATCalculator = () => {
  const [formData, setFormData] = useState({
    taxRate: 0,
    amount: 0,
  });

  const [finalValue, setFinalValue] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };
  const handleCalculate = () => {
    const val = formData.amount * (formData.taxRate / 100) + formData.amount;
    setFinalValue(val);
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-zinc-700 border-4 border-white px-8 pt-8 pb-2 rounded-lg shadow-lg w-96 space-y-4">
        <div className=" space-y-1">
          <label
            htmlFor="pecentage"
            className=" text-white font-poppins text-sm"
          >
            Tax Rate
          </label>
          <div className="flex items-center">
            <input
              type="number"
              className=" w-full font-medium rounded-tl rounded-bl  py-1 outline-none px-2 font-poppins"
              name="taxRate"
              value={formData.taxRate}
              onChange={handleChange}
            />
            <span className="py-1 px-2 bg-gray-400 text-white rounded-tr rounded-br">
              %
            </span>
          </div>
        </div>
        <div className=" space-y-1">
          <label
            htmlFor="start_value"
            className=" text-white font-poppins text-sm"
          >
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className=" w-full font-medium rounded py-1 outline-none px-2 font-poppins"
          />
        </div>
        <div className=" space-y-1">
          <label
            htmlFor="final_value"
            className=" text-white font-poppins text-sm"
          >
            Total
          </label>
          <div className=" w-full font-medium bg-white rounded py-1 outline-none px-2 font-poppins">
            {finalValue.toFixed(2)}
          </div>
        </div>
        <div className="">
          <button
            onClick={handleCalculate}
            className=" bg-slate-500 p-1 w-full mt-5 rounded-lg text-white hover:bg-opacity-80 duration-150"
          >
            Calculate
          </button>
        </div>
        <div className="mt-4">
          <p className="text-gray-300  font-inter text-xs text-center mb-3">
            Powered by{" "}
            <span className=" text-white font-medium">ExpenseMinds</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VATCalculator;
