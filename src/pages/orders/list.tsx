import React from "react";
import {
    useTable,
    useDelete,
    useNotification,
    BaseKey,
} from "@refinedev/core";
import { useNavigate } from "react-router-dom";

export const OrdersList: React.FC = () => {
    const { tableQueryResult } = useTable({ resource: "orders" });
    const orders = tableQueryResult.data?.data ?? [];
    const navigate = useNavigate();

    const { mutate: deleteOrder } = useDelete();
    const { open: notify } = useNotification();

    const handleDelete = (id: BaseKey) => {
        if (confirm("Are you sure you want to delete this order?")) {
            deleteOrder(
                {
                    resource: "orders",
                    id,
                },
                {
                    onSuccess: () => {
                        notify?.({
                            type: "success",
                            message: "Order deleted successfully",
                        });
                    },
                }
            );
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2>📦 Orders</h2>
                <button
                    className="btn btn-primary shadow"
                    onClick={() => navigate("/orders/create")}
                >
                    + Add Order
                </button>
            </div>

            {orders.length === 0 ? (
                <div className="alert alert-info">No orders found.</div>
            ) : (
                <table className="table table-hover table-bordered table-striped shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Items Count</th>
                            <th style={{ width: "240px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.name}</td>
                                <td>{order.phone}</td>
                                <td>{order.address}</td>
                                <td>{order.items?.length || 0}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-success me-2"
                                        onClick={() => navigate(`/orders/edit/${order.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => navigate(`/orders/show/${order.id}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(order.id!)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};