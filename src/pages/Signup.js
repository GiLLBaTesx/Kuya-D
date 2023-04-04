import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ fname, lname, address, contact, email, password });
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="signup__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                        <h1>Create an account</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First name" value={fname} required onChange={(e) => setFName(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" value={lname} required onChange={(e) => setLName(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" value={address} required onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Contact #</Form.Label>
                            <Form.Control type="text" placeholder="Contact #" value={contact} required onChange={(e) => setContact(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email}
                            autoComplete="username"
                            required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password} 
                            autoComplete="current-password"
                            required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading}>
                                Create account
                            </Button>
                        </Form.Group>
                        <p className="pt-3 text-center">
                            Don't have an account? <Link to="/login">Login</Link>{" "}
                        </p>
                    </Form>
                </Col>
                <Col md={6} className="signup__image--container"></Col>
            </Row>
        </Container>
    );
}

export default Signup;
