import axios from "axios";
import { authenticationURL } from "../../url/URL";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";

const Landing = () => {
  const navigate = useNavigate();
  const handleAuth = async (credential: string | undefined) => {
    try {
      const res = await axios.post(`${authenticationURL}`, {
        token: credential,
      });
      localStorage.setItem("token", res.data.userToken);
      toast.success(res.data.message);
      if (res.status === 200) {
        navigate("/dashboard/records/daily");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className=" h-full bg-orange-700 px-4 lg:px-6 py-8">
        <Navbar handleAuth={handleAuth} />
        <HeroSection handleAuth={handleAuth} />
        <FeaturesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
