import "bootstrap/dist/css/bootstrap.min.css";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";
import "./styles/App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "./components/AuthGuard";

function App() {
  const { user } = useAuth0();

  // return <div className="App">{!user ? <WelcomePage /> : <Dashboard />}</div>;
  return (
    <Routes>
      <Route path="/">
        <Route index element={<WelcomePage />} />
        <Route path="dashboard" element={<AuthGuard component={Dashboard} />} />
      </Route>
    </Routes>
  );
}

export default App;
