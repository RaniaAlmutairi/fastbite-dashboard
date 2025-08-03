import React from "react";
import { useTable, useDelete, useNotification, BaseKey } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

export const MealsList: React.FC = () => {
    const { tableQueryResult } = useTable({ resource: "meals" });
    const meals = tableQueryResult.data?.data ?? [];
    const navigate = useNavigate();

    const { mutate: deleteMeal } = useDelete();
    const { open: notify } = useNotification();

const handleDelete = (id: BaseKey) => {
    if (confirm("Are you sure you want to delete this meal? ")) {
        deleteMeal(
            {
                resource: "meals",
                id,
            },
            {
                onSuccess: () => {
                    notify?.({
                        type: "success",
                        message: "Deleted Successfully",
                    });
                },
            }
        );
    }
};


    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2>🍽️ Meals</h2>
                <button
                    className="btn btn-primary shadow"
                    onClick={() => navigate("/meals/create")}
                >
                    + Add Meal
                </button>
            </div>

            {meals.length === 0 ? (
                <div className="alert alert-info">No meals found.</div>
            ) : (
                <table className="table table-hover table-bordered table-striped shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th style={{ width: "220px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal) => (
                            <tr key={meal.id}>
                                <td>{meal.name}</td>
                                <td>{meal.price}</td>
                                <td>{meal.category}</td>
                                <td>{meal.description}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-success me-2"
                                        onClick={() => navigate(`/meals/edit/${meal.id}`)}
                                    >
                                         Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => navigate(`/meals/show/${meal.id}`)}
                                    >
                                         View
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(meal.id!)}
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
