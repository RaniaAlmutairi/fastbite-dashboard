import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShow } from "@refinedev/core";
import { Card, Button, Spinner, ListGroup } from "react-bootstrap";

export const OrdersShow: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { queryResult } = useShow({ resource: "orders", id: id! });
    const { data, isLoading } = queryResult;
    const order = data?.data;

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center mt-5 text-danger">
                Order not found.
            </div>
        );
    }

    return (
        <Card className="shadow-sm">
            <Card.Header>
                <h4>📦 Order Details</h4>
            </Card.Header>
            <Card.Body>
                <h5>Customer Info</h5>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>

                <h5 className="mt-4">Ordered Items</h5>
                <ListGroup className="mb-4">
                    {order.items.map((item: any, index: number) => (
                        <ListGroup.Item key={index}>
                            🍔 {item.name} — {item.price} SAR
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Button variant="secondary" onClick={() => navigate("/orders")}>
                    ← Back to Orders
                </Button>
            </Card.Body>
        </Card>
    );
};