import React, { useState } from "react";
import { Helmet } from "react-helmet";
<Helmet>
  <title>FastBite | Create Order</title>
  <meta name="description" content="Manually create a new order for customers in the admin area." />
</Helmet>

import {
    useCreate,
    useNotification,
    useList,
} from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import {
    Form,
    Button,
    Container,
    Card,
    Spinner,
    Alert,
} from "react-bootstrap";
import Select from "react-select";

export const OrdersCreate: React.FC = () => {
    const navigate = useNavigate();
    const { open: notify } = useNotification();
    const { mutate: createOrder, isLoading } = useCreate();

    const { data, isLoading: mealsLoading } = useList({ resource: "meals" });
    const meals = data?.data ?? [];

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        items: [] as { id: string; name: string }[],
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleItemsChange = (selectedOptions: any) => {
        const selectedItems = selectedOptions.map((opt: any) => ({
            id: opt.value,
            name: opt.label,
        }));
        setFormData({ ...formData, items: selectedItems });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        createOrder(
            {
                resource: "orders",
                values: formData,
            },
            {
                onSuccess: () => {
                    notify?.({
                        type: "success",
                        message: "Order created successfully!",
                    });
                    navigate("/orders");
                },
                onError: () => {
                    setError("Something went wrong. Try again.");
                },
            }
        );
    };

    const mealOptions = meals.map((meal: any) => ({
        value: meal.id,
        label: `${meal.name} (${meal.price} SAR)`,
    }));

    const selectedOptions = formData.items.map((item: any) => ({
        value: item.id,
        label: item.name,
    }));

    return (
        <Container className="py-5" style={{ maxWidth: "600px" }}>
            <Card className="shadow-sm">
                <Card.Body>
                    <h3 className="mb-4">Create New Order</h3>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Items</Form.Label>
                            <Select
                                isMulti
                                options={mealOptions}
                                value={selectedOptions}
                                onChange={handleItemsChange}
                                placeholder="Select meals..."
                                isDisabled={mealsLoading}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />{" "}
                                    Creating...
                                </>
                            ) : (
                                "Create Order"
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
