import Calculator from "../../components/Calculator/Calculator";
import Percentage from "../../components/Percentage/Percentage";
import VATCalculator from "../../components/VATCalculator/VATCalculator";

const Tools = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 bg-black border-2 rounded-lg border-zinc-600 py-4 space-y-3">
        <div className="flex items-center justify-center">
          <p className="text-white font-mono bg-black px-3 py-0.5 rounded-md">
            Calculator
          </p>
        </div>
        <Calculator />
      </div>
      <div className="col-span-12 lg:col-span-6 bg-black border-2 rounded-lg border-zinc-600 py-4 space-y-3">
        <div className="flex items-center justify-center">
          <p className="text-white font-mono bg-black px-3 py-0.5 rounded-md">
            Percentage
          </p>
        </div>
        <Percentage />
      </div>
      <div className="col-span-12 lg:col-span-6 bg-black border-2 rounded-lg border-zinc-600 py-4 space-y-3">
        <div className="flex items-center justify-center">
          <p className="text-white font-mono bg-black px-3 py-0.5 rounded-md">
            VAT
          </p>
        </div>
        <VATCalculator />
      </div>
    </div>
  );
};

export default Tools;
