    import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
    import React, { useState } from "react";
    import { Alert, Button, Col, Form, Row } from "react-bootstrap";
    import { useSelector } from "react-redux";
    import { useNavigate } from "react-router-dom";
    import { useCreateOrderMutation } from "../services/appApi";
    import  generateReceipt from  "../features/getReceipt"
    

    function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError, isSuccess }] =
        useCreateOrderMutation();
    const [country] = useState("");
    const [address] = useState("");
    const [paying, setPaying] = useState(false);
    const [lname] = useState("");
    const [contact] = useState("");
    const [fname] = useState("");

    const currentDate = new Date();


    async function handlePay(e) {
        e.preventDefault();
        if (!stripe || !elements || user.cart.count <= 0) return;
        setPaying(true);
        const { client_secret } = await fetch("http://localhost:8080/create-payment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ",
        },
        body: JSON.stringify({ amount: user.cart.total }),
        }).then((res) => res.json());
        const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
            card: elements.getElement(CardElement),
        },
        });
        setPaying(false);

        if (paymentIntent) {
        createOrder({ userId: user._id, cart: user.cart, address, country }).then(
            (res) => {
            if (!isLoading && !isError) {
                setAlertMessage(`Payment ${paymentIntent.status}`);
                setTimeout(() => {
                // navigate("/orders");
                }, 3000);
            }
            }
        );
        }
    }

    return (
        <Col className="cart-payment-container">
        <Form onSubmit={handlePay}>
            <Row>
            {alertMessage && <Alert>{alertMessage}</Alert>}
            <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={user.fname}
                    disabled
                />
                </Form.Group>
                </Col>

                <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={user.lname}
                    disabled
                />
                </Form.Group>
                </Col>

                <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Contact Number"
                    value={user.contact}
                    disabled
                />
                </Form.Group>
                </Col>

                <Col md={6}>        
                <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Country"
                    value={user.country}
                    disabled
                />
                </Form.Group>
                </Col>

                <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Address"
                    value={user.address}
                    disabled
                />
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Date Today</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Address"
                    value={currentDate}
                    disabled
                />
                </Form.Group>
            </Col>

            <Col md={6}>
            </Col>

            {/* <Col md={12}>
                <Form.Group>
                <Form.Label>Card Details</Form.Label>
                <CardElement />
                </Form.Group>
            </Col> */}
            </Row>
        
            {/* <Button className="mt-4" type="submit" disabled={paying}>
            {paying ? "Processing Payment..." : "Pay Now"}
            </Button> */}

            <Button className="mt-4 ms-2" type="submit" disabled>
                Pay Via Gcash
            </Button>

            <Button className="mt-4 ms-5" type="submit" disabled onClick={generateReceipt}>
                Print Reciept
            </Button>
        </Form>
        </Col>
    );
}

    export default CheckoutForm;    