import { useEffect, useState } from "react";
import { tipsData } from "./helper/TipsData";

const TipsBar = () => {
  const [currIndex, setCurrIndex] = useState<number>(0);

  const nextTip = () => {
    setCurrIndex((prevIndex) => (prevIndex + 1) % tipsData.length);
  };
  useEffect(() => {
    const tipsInterval = setInterval(() => {
      nextTip();
    }, 5000);
    return () => clearInterval(tipsInterval);
  }, []);
  return (
    <div className="bg-black">
      <div className="bg-orange-800 px-2 py-4 rounded h-32 flex flex-col items-center space-y-4">
        <p className=" text-center text-black rounded-md py-1 bg-white w-full font-poppins font-semibold">
          Useful Tips
        </p>
        <p className="text-white text-sm font-poppins text-center">
          {tipsData[currIndex]}
        </p>
      </div>
    </div>
  );
};

export default TipsBar;
