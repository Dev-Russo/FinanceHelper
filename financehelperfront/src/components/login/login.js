import { useState } from "react";
import { Container, Nav, Tab, Form, Button } from "react-bootstrap";
import { FaFacebookF, FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/logo1.png"
import "./login.css"

const Login = () => {
  const [key, setKey] = useState("login");

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 shadow-lg rounded bg-white" style={{ width: "500px" }}>
      <img src={logo} alt="Finance Helper Logo" className="logo" />
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
          <Nav variant="pills" className="nav-justified mb-3">
            <Nav.Item>
              <Nav.Link eventKey="login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="register">Register</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Form>
                <div className="text-center mb-3">
                  {[FaFacebookF, FaGoogle, FaTwitter, FaGithub].map((Icon, i) => (
                    <Button variant="link" className="mx-1" key={i}>
                      <Icon />
                    </Button>
                  ))}
                </div>
                <Form.Group className="mb-1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
                <div className="d-flex justify-content-between mb-3">
                  <Form.Check label="Remember me" />
                  <a href="#!">Forgot password?</a>
                </div>
                <Button variant="primary" type="submit" className="w-100">
                  Sign in
                </Button>
                <p className="text-center mt-3">Not a member? <a href="#!">Register</a></p>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="register">
              <Form>
                <div className="text-center mb-3">
                  {[FaFacebookF, FaGoogle, FaTwitter, FaGithub].map((Icon, i) => (
                    <Button variant="link" className="mx-1" key={i}>
                      <Icon />
                    </Button>
                  ))}
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control type="password" placeholder="Repeat password" />
                </Form.Group>
                <Form.Check className="mb-3" label="I have read and agree to the terms" />
                <Button variant="primary" type="submit" className="w-100">
                  Sign up
                </Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </Container>
  );
};

export default Login;
