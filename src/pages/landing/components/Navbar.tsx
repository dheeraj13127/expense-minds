import { GoogleLogin } from "@react-oauth/google";
import logo from "../../../assets/em_new_logo.png";
import toast from "react-hot-toast";

interface NavbarType {
  handleAuth: (credential: string | undefined) => Promise<void>;
}

const Navbar = ({ handleAuth }: NavbarType) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <img src={logo} alt="logo" className=" w-32 lg:w-40 p-1 rounded-xl" />
        </div>

        <div className="flex ">
          <GoogleLogin
            shape="circle"
            text={"signin"}
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
  );
};

export default Navbar;
