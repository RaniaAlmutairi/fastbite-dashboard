import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    Button,
    ListGroup,
    Alert,
    Navbar,
    Row,
    Col,
} from "react-bootstrap";
import { Helmet } from "react-helmet";

<Helmet>
  <title>FastBite | Thank You</title>
  <meta name="description" content="Thank you for your order! We’re preparing your meal and it will be delivered soon." />
</Helmet>

export const ThankYouPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    if (!order) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="warning">
                    ⚠️ No order data found. Please place an order first.
                </Alert>
                <Button variant="dark" onClick={() => navigate("/menu")}>
                    Back to Menu
                </Button>
            </Container>
        );
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" className="px-4 shadow-sm">
                <Navbar.Brand>🍽️ FastBite</Navbar.Brand>
            </Navbar>

            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow border-0">
                            <Card.Body>
                                <div className="text-center mb-4">
                                    <h2 className="text-success fw-bold">
                                         Thank you for your order!
                                    </h2>
                                    <p className="text-muted">
                                        We’re preparing your food and will contact you soon.
                                    </p>
                                </div>

                                <h5 className="mb-3 fw-semibold"> Order Details:</h5>
                                <ListGroup className="mb-4">
                                    {order.items.map((item: any, index: number) => (
                                        <ListGroup.Item key={index}>
                                            🍔 {item.name} – <strong>{item.price} SAR</strong>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>

                                <h6 className="fw-semibold">👤 Customer Info:</h6>
                                <p className="mb-4">
                                    <strong>Name:</strong> {order.name}
                                    <br />
                                    <strong>Address:</strong> {order.address}
                                    <br />
                                    <strong>Phone:</strong> {order.phone}
                                </p>

                                <div className="d-grid">
                                    <Button
                                        variant="success"
                                        size="lg"
                                        onClick={() => navigate("/menu")}
                                    >
                                        Back to Menu
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};