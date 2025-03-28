import { useState } from "react";
import { Container, Nav, Tab, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/logo1.png";
import "./login.css";
import { login, saveTokens } from "../../services/loginService";

const Login = () => {
  const [key, setKey] = useState("login");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    try {
      const { accessToken, refreshToken } = await login(username, password);

      if (!accessToken || !refreshToken) {
        throw new Error("Usuário ou senha inválidos!");
      }

      saveTokens({ accessToken, refreshToken });

      console.log("Login bem-sucedido! Redirecionando...");
    } catch (err) {
      console.error("Erro ao tentar fazer login:", err);
      setError(err.message || "Falha no login");
    }
  };

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
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="d-flex justify-content-between mb-3">
                  <Form.Check label="Remember me" />
                  <a href="#!">Forgot password?</a>
                </div>
                <Button variant="primary" type="submit" className="w-100">
                  Sign in
                </Button>
                <p className="text-center mt-3">
                  Not a member? <a href="#!">Register</a>
                </p>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </Container>
  );
};

export default Login;
