import React, { useState } from "react";

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const calculateResult = () => {
    const evalResult = eval(input);
    setResult(Number(evalResult).toFixed(2));
  };

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="bg-zinc-700 border-4 border-white p-8 rounded-lg shadow-lg w-80">
        <div className="bg-gray-100 p-4 rounded-md mb-4 text-right">
          <div className="text-lg text-gray-700">{input || "0"}</div>
          <div className="text-2xl font-semibold">{result || "0"}</div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-"].map(
            (item) => (
              <button
                key={item}
                onClick={() => handleClick(item)}
                className="bg-gray-300 p-1 rounded-lg hover:bg-gray-400"
              >
                {item}
              </button>
            )
          )}

          <button
            onClick={() => handleClick("0")}
            className="bg-gray-300 p-1  rounded-lg hover:bg-gray-400"
          >
            0
          </button>
          <button
            onClick={() => handleClick(".")}
            className="bg-gray-300 p-1  rounded-lg hover:bg-gray-400"
          >
            .
          </button>
          <button
            onClick={handleClear}
            className="bg-black p-1 text-sm rounded-lg text-white hover:bg-opacity-70 duration-150"
          >
            C
          </button>
          <button
            onClick={() => handleClick("+")}
            className="bg-gray-300 p-1  rounded-lg hover:bg-gray-400"
          >
            +
          </button>

          <button
            onClick={calculateResult}
            className="bg-primary-green p-1  rounded-lg text-white col-span-4 hover:bg-opacity-80 duration-150"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
