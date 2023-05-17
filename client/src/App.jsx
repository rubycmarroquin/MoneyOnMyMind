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
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/AuthContext";
import FinancialPage from "./pages/FInancialPage";

function App() {
  const { getAccessTokenSilently, user } = useAuth0();
  const { setAuthToken } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      getAccessTokenSilently().then((token) => {
        setAuthToken(token);
      });
    }
  }, [user, getAccessTokenSilently]);

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
          <Route
            path="financial-counseling"
            element={<AuthGuard component={FinancialPage} />}
          />
        </Route>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
