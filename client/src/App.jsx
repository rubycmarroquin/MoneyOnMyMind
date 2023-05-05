import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListStudents from "./components/ListStudents";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/UserProfile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user } = useAuth0();

  return (
    <div className="App">
      <MyNavBar />
      <ListStudents />
      {!user ? <LoginButton /> : null}
      {user ? <LogoutButton /> : null}
      <Profile />
    </div>
  );
}

export default App;
