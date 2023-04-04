import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import ForgotPassword from "../features/ForgotPassword";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  function handleShowForgotPasswordModal() {
    setShowForgotPasswordModal(true);
  }

  function handleCloseForgotPasswordModal() {
    setShowForgotPasswordModal(false);
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1>Login to your account</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading}>
                Login
              </Button>
            </Form.Group>

            <p className="pt-3 text-center">
              Don't have an account? <Link to="/signup">Create account</Link>{" "}
            </p>

            <p className="pt-3 text-center">
              <Button variant="link" onClick={handleShowForgotPasswordModal}>
                Forgot Password?
              </Button>{" "}
            </p>
          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>

      <Modal show={showForgotPasswordModal} onHide={handleCloseForgotPasswordModal}>
        <ForgotPassword handleClose={handleCloseForgotPasswordModal} />
      </Modal>
    </Container>
  );
}

export default Login;
