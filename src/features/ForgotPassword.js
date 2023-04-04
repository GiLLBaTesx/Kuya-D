import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Modal, Alert } from "react-bootstrap";
import emailjs from "emailjs-com";

import { useForgotPasswordMutation } from "../services/appApi";

function ForgotPassword({ handleClose }) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, { isError }] = useForgotPasswordMutation();

  async function handleForgotPassword(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgotPassword(email);
      sendPasswordResetEmail(email);
      setSuccess(true);
      setError("");
      setIsLoading(false);
    } catch (error) {
      setError(error.data);
      setIsLoading(false);
    }
  }

  function sendPasswordResetEmail(email) {
    const serviceId = "service_5y29olk";
    const templateId = "template_a2da3re";
    const userId = "YOUR_USER_ID";

    const templateParams = {
      to_email: email,
      message_html: "Enter your email content here",
    };

    emailjs.send(serviceId, templateId, templateParams, userId).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success ? (
          <div>
            <p>A password reset link has been sent to your email.</p>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleForgotPassword}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            {isError && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </Form>
        )}
      </Modal.Body>
    </>
  );
}

export default ForgotPassword;
