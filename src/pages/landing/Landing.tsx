import axios from "axios";
import { authenticationURL } from "../../url/URL";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const Landing = () => {
  const handleAuth = async (credential: string | undefined) => {
    try {
      const res = await axios.post(`${authenticationURL}`, {
        token: credential,
      });
      localStorage.setItem("token", res.data.userToken);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="w-48 m-10">
        <GoogleLogin
          shape="circle"
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
  );
};

export default Landing;
