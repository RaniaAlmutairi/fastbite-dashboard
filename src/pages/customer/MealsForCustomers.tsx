import React, { useState } from "react";
import { useList } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
<Helmet>
  <title>FastBite | Menu</title>
  <meta name="description" content="Explore delicious meals and place your order quickly from our online menu." />
</Helmet>

import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Badge,
    Modal,
    Toast,
    ToastContainer,
} from "react-bootstrap";

export const MealsForCustomers = () => {
    const { data, isLoading } = useList({ resource: "meals" });
    const meals = data?.data ?? [];

    const [cart, setCart] = useState<any[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate(); 

    const addToCart = (meal: any) => {
        setCart((prev) => [...prev, meal]);
        setShowToast(true);
    };

    const removeFromCart = (index: number) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            {/*  Navbar */}
            <nav className="navbar navbar-dark bg-dark fixed-top shadow px-3">
                <span className="navbar-brand">🍽️ FastBite</span>
                <Button variant="light" onClick={() => setShowCart(true)}>
                    🛒 Cart <Badge bg="danger">{cart.length}</Badge>
                </Button>
            </nav>

            {/*  Main content */}
            <Container style={{ paddingTop: "90px" }}>
                <h2 className="mb-4">🍔 Menu</h2>
                <Row>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        meals.map((meal) => (
                            <Col key={meal.id} md={6} lg={4} className="mb-4">
                                <Card className="shadow-sm h-100">
                                    {meal.image && (
                                        <Card.Img
                                            variant="top"
                                            src={meal.image}
                                            alt={meal.name}
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                    )}
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{meal.name}</Card.Title>
                                        <Card.Text>{meal.description}</Card.Text>
                                        <h6>{meal.price} SAR</h6>
                                        <Button
                                            variant="success"
                                            onClick={() => addToCart(meal)}
                                            className="mt-auto"
                                        >
                                            Add to Cart 🛒
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>

            {/*  Toast notification (Top Right) */}
            <ToastContainer
                position="top-end"
                className="p-3 position-absolute"
                style={{ top: 10, right: 10, zIndex: 9999 }}
            >
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={2000}
                    autohide
                    bg="success"
                >
                    <Toast.Header>
                        <strong className="me-auto">Cart</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white"> Added to cart!</Toast.Body>
                </Toast>
            </ToastContainer>

            {/*  Cart Modal */}
            <Modal show={showCart} onHide={() => setShowCart(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>🛒 Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul className="list-group">
                            {cart.map((item, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <strong>{item.name}</strong> - {item.price} SAR
                                    </div>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeFromCart(index)}
                                    >
                                        Remove
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCart(false)}>
                        Close
                    </Button>
                    {cart.length > 0 && (
                        <Button
                            variant="primary"
                            onClick={() =>
                                navigate("/customer/checkout", {
                                    state: { cart },
                                })
                            }
                        >
                            Checkout
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};