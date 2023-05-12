import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import Pig from "../assets/Pig_Removed.png";
import "../styles/NavBar.css";

const NavigationBar = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img id="Pig" src={Pig} />
            Money on My Mind
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/budget">Budgets</Nav.Link>
              <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
            <Navbar.Text>Signed in as: {user.nickname}</Navbar.Text>
            <br />
            <LogoutButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
};

export default NavigationBar;
