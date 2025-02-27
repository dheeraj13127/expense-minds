import { GoogleLogin } from "@react-oauth/google";
import heroImg from "../../../assets/hero_section_img.png";
import toast from "react-hot-toast";

interface HeroSectionType {
  handleAuth: (credential: string | undefined) => Promise<void>;
}
const HeroSection = ({ handleAuth }: HeroSectionType) => {
  return (
    <div className=" grid grid-cols-12 my-24 md:my-32 gap-4">
      <div className=" col-span-12 lg:col-span-5">
        <p className="text-white text-center lg:text-left text-3xl md:text-4xl lg:text-5xl font-semibold font-poppins leading-snug">
          Streamline your expense management with ease
        </p>
        <div className="mt-8 md:mt-10 px-3">
          <ul className="lg:list-disc text-white text-center lg:text-left space-y-2">
            <li>
              <p className="text-white text-base md:text-xl font-poppins">
                Easily add and manage your expenses
              </p>
            </li>
            <li>
              <p className="text-white text-base md:text-xl font-poppins">
                View you spending patterns in different formats
              </p>
            </li>
            <li>
              <p className="text-white text-base md:text-xl font-poppins">
                Get assisted by powerful AI chatbot
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <div className="flex justify-center lg:justify-start">
            <GoogleLogin
              shape="circle"
              text={"signup_with"}
              theme="filled_black"
              onSuccess={(credentialResponse) => {
                handleAuth(credentialResponse.credential);
              }}
              onError={() => {
                toast.error("Something went wrong !");
              }}
            />
          </div>
        </div>
      </div>
      <div className=" col-span-12 lg:col-span-7">
        <div className="mt-16 lg:mt-0">
          <img src={heroImg} alt="hero-img" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
