import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function ResetPassword({ handleResetPassword, isLoading }) {
  const [newPassword, setNewPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleResetPassword(newPassword);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Reset Password"}
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default ResetPassword;
