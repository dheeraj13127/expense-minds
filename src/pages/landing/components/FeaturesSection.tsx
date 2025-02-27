import transactionImg from "../../../assets/transactions.png";
import statisticsImg from "../../../assets/statistics.png";
import chatbotImg from "../../../assets/aichatbot.png";
const FeaturesSection = () => {
  return (
    <div className=" grid grid-cols-12 my-24 md:my-40 gap-4">
      <div className="col-span-12 md:mt-16">
        <div
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-once={true}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-24"
        >
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <img
              src={transactionImg}
              alt="transaction"
              className=" w-[em] rounded-lg shadow-xl"
            />
          </div>

          <div>
            <p
              className="text-white
             font-bold font-poppins text-2xl md:text-3xl"
            >
              Simple money tracking
            </p>
            <p className="mt-4 text-white text-opacity-80 font-medium font-inter text-lg">
              It takes seconds to record daily transactions. Put them into clear
              and visualized categories such as Expense: Food, Shopping or
              Income: Salary, Gift.
            </p>
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-once={true}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-24"
        >
          <div className="bg-white p-2 rounded-xl shadow-lg flex md:hidden">
            <img
              src={statisticsImg}
              alt="transaction"
              className=" w-[em] rounded-lg shadow-xl"
            />
          </div>
          <div>
            <p
              className="text-white
             font-semibold font-poppins text-2xl md:text-3xl"
            >
              Well analysed statistics
            </p>
            <p className="mt-4 text-white text-opacity-80 font-medium font-inter text-lg">
              One report to give a clear view on your spending patterns.
              Understand where your money comes and goes with easy-to-read
              graphs.
            </p>
          </div>
          <div className="bg-white p-2 rounded-xl shadow-lg hidden md:flex">
            <img
              src={statisticsImg}
              alt="transaction"
              className=" w-[em] rounded-lg shadow-xl"
            />
          </div>
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-once={true}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-24"
        >
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <img
              src={chatbotImg}
              alt="transaction"
              className=" w-[em] rounded-lg shadow-xl"
            />
          </div>

          <div>
            <p
              className="text-white
             font-bold font-poppins text-2xl md:text-3xl"
            >
              Automated assistance
            </p>
            <p className="mt-4 text-white text-opacity-80 font-medium font-inter text-lg">
              It is available 24/7 to guide you through your finances, answer
              queries, and help you make smarter financial decisions with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
