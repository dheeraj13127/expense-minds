import axios from "axios";
import { getUserProfileURL } from "../../url/URL";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const fetchUserDetails = async () => {
    const res = await axios.get(getUserProfileURL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(res);
  };
  return (
    <div>
      <div>
        <button onClick={fetchUserDetails}>Dashboard</button>
      </div>
    </div>
  );
};

export default Dashboard;
