import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import ResetButtonComp from "../components/ResetPassword";
import { SnackbarContext } from "../components/SnackbarContext";
import { AuthContext } from "../components/AuthContext";
import "../styles/AccountSettings.css";

const AccountSettings = () => {
  const { user } = useAuth0();
  const [userInfo, setUserInfo] = useState({});
  const { handleOpen } = useContext(SnackbarContext);
  const { authToken } = useContext(AuthContext);

  async function loadUserData() {
    // fetch the data from the backend
    const response = await fetch(`http://localhost:8080/user/${user.sub}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const json = await response.json();
    setUserInfo(json);
  }

  // updates a user's name & phone number
  async function editUserInfo(updatedInfo) {
    return fetch(`http://localhost:8080/user/${user.sub}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((response) => {
        if (response.status === 200) handleOpen("Successfully updated!");
        else handleOpen("An error occured, try again!");
        return response.json();
      })
      .then((data) => console.log(data));
  }

  const handleNameChange = (event) => {
    const name = event.target.value;
    setUserInfo((user) => ({ ...userInfo, name }));
  };

  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setUserInfo((user) => ({ ...userInfo, phone }));
  };

  useEffect(() => {
    if (authToken) loadUserData();
  }, [authToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editUserInfo(userInfo);
  };

  return (
    authToken && (
      <>
        <NavigationBar />
        <div id="SettingsOuterDiv">
          <div id="SettingsFormOuterDiv">
            <h1>Account Settings</h1>
            <Form className="SettingsForm" onSubmit={handleSubmit}>
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <input
                  type="text"
                  id="add-name"
                  placeholder="name"
                  required
                  value={userInfo.name || ""}
                  onChange={handleNameChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Phone Number </Form.Label>
                <input
                  type="text"
                  id="add-phone"
                  placeholder="Phone"
                  required
                  value={userInfo.phone || ""}
                  onChange={handlePhoneChange}
                />
              </Form.Group>
              <Form.Group as={Col} id="ButtonsGroups">
                <Button type="submit" variant="outline-success" id="FormButton">
                  Save Changes
                </Button>
              </Form.Group>
            </Form>
          </div>
          <ResetButtonComp user_email={userInfo.email} />
        </div>
      </>
    )
  );
};

export default AccountSettings;
