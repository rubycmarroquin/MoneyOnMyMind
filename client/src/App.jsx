import "bootstrap/dist/css/bootstrap.min.css";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";
import AccountSettings from "./pages/AccountSettings";
import "./styles/App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "./components/AuthGuard";
import { SnackbarProvider } from "./components/SnackbarContext";
import Budget from "./pages/Budget";

function App() {
  const { user } = useAuth0();

  // return <div className="App">{!user ? <WelcomePage /> : <Dashboard />}</div>;
  return (
    <SnackbarProvider>
      <Routes>
        <Route path="/">
          <Route index element={<WelcomePage />} />
          <Route
            path="dashboard"
            element={<AuthGuard component={Dashboard} />}
          />
          <Route
            path="settings"
            element={<AuthGuard component={AccountSettings} />}
          />
          <Route path="budget" element={<AuthGuard component={Budget} />} />
        </Route>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
