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
    // Only show the navigation bar if the user is authenticated
    isAuthenticated && (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        data-testid="navbar"
      >
        <Container>
          {/* Brand logo and text */}
          <Navbar.Brand href="/">
            <img id="Pig" src={Pig} alt="ProjectLogoOfPig" />
            Money on My Mind
          </Navbar.Brand>

          {/* Hamburger menu icon */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Navigation links */}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/budget">Budgets</Nav.Link>
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

            {/* Display user's given name or nickname if given name is undefined */}
            <Navbar.Text>
              Signed in as:{" "}
              <span style={{ color: "white" }}>
                {user.given_name || user.nickname}
              </span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
};

export default NavigationBar;
