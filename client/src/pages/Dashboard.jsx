import Profile from "../components/UserProfile";
import NavigationBar from "../components/NavigationBar";

const Dashboard = () => {
  return (
    <div id="DashBoardOuterDiv">
      <NavigationBar />
      <div id="ProfileDiv">
        <Profile />
      </div>
    </div>
  );
};

export default Dashboard;
