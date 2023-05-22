import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

export const useCalendar = () => {
  const { authToken } = useContext(AuthContext);
  const { user } = useAuth0();

  const createEvent = async (data) => {
    const userData = {
      expenseName: data.expense_name,
      expenseDate: data.duedate,
      email: user.email,
    };
    await fetch(`/api/calendar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch(console.error);
  };
  return {
    createEvent,
  };
};
