import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import Pig from "../assets/Pig_Removed.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/NavBar.css";

const NavigationBar = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        data-testid="navbar"
      >
        <Container>
          <Navbar.Brand href="/">
            <img id="Pig" src={Pig} />
            Money on My Mind
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/budget">Budgets</Nav.Link>
              </Nav.Item>
              <NavDropdown
                title="More Options"
                id="nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item
                  href="/financial-counseling"
                  eventKey="Financial Literacy"
                >
                  Financial Literacy
                </NavDropdown.Item>
                <NavDropdown.Item href="/settings" eventKey="Account Settings">
                  Account Settings
                </NavDropdown.Item>
                <LogoutButton />
              </NavDropdown>
            </Nav>
            <Navbar.Text>
              Signed in as:{" "}
              <span style={{ color: "white" }}>
                {user.given_name || user.nickname}
              </span>
            </Navbar.Text>
            <br />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
};

export default NavigationBar;
