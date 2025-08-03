import React, { useEffect, useState } from "react";
import {
    useShow,
    useUpdate,
    useNotification,
    useList,
} from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import {
    Form,
    Button,
    Container,
    Card,
    Spinner,
    Alert,
} from "react-bootstrap";
import Select from "react-select";

export const OrdersEdit: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { open: notify } = useNotification();

    const { queryResult: showQuery } = useShow({
        resource: "orders",
        id,
    });

    const { data, isLoading } = showQuery;
    const order = data?.data;

    const { mutate: updateOrder, isLoading: isUpdating } = useUpdate();

    const { data: mealsData, isLoading: mealsLoading } = useList({
        resource: "meals",
    });

    const meals = mealsData?.data ?? [];

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        items: [] as { id: string; name: string }[],
    });

    useEffect(() => {
        if (order) {
            setFormData({
                name: order.name || "",
                address: order.address || "",
                phone: order.phone || "",
                items: order.items || [],
            });
        }
    }, [order]);

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

        updateOrder(
            {
                resource: "orders",
                id,
                values: formData,
            },
            {
                onSuccess: () => {
                    notify?.({
                        type: "success",
                        message: "Order updated successfully!",
                    });
                    navigate("/orders");
                },
                onError: () => {
                    notify?.({
                        type: "error",
                        message: "Failed to update order.",
                    });
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

    if (isLoading || mealsLoading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="py-5" style={{ maxWidth: "600px" }}>
            <Card className="shadow-sm">
                <Card.Body>
                    <h3 className="mb-4">✏️ Edit Order</h3>
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
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Order Items</Form.Label>
                            <Select
                                isMulti
                                options={mealOptions}
                                value={selectedOptions}
                                onChange={handleItemsChange}
                                placeholder="Select meals..."
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isUpdating}
                            className="w-100"
                        >
                            {isUpdating ? "Updating..." : "Update Order"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
