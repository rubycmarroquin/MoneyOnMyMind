import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import "../styles/AccountSettings.css";

const AccountSettings = () => {
  const { user } = useAuth0();
  const [userInfo, setUserInfo] = useState({});

  async function loadUserData() {
    // fetch the data from the backend
    const response = await fetch(`http://localhost:8080/user/${user.sub}`);
    const json = await response.json();
    setUserInfo(json);
    console.log(json);
  }

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  const handleNameChange = (event) => {
    const name = event.target.value;
    setUserInfo((user) => ({ ...userInfo, name }));
  };

  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setUserInfo((user) => ({ ...userInfo, phone }));
  };

  //   // updates a user's name & phone number
  //   const editUserInfo = (toEditStudent) => {
  //     return fetch(`http://localhost:8080/api/students/${toEditStudent.id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(toEditStudent),
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         onUpdateStudent(data);
  //         //this line just for cleaning the form
  //         clearForm();
  //       });
  //   };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
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
            <Form.Group as={Col}>
              <Button type="submit" variant="outline-success" id="FormButton">
                Save Changes
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
