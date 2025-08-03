import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { useParams } from "react-router-dom";

export const MealsEdit: React.FC = () => {
    const { id } = useParams();

    const { formProps, saveButtonProps } = useForm({
        resource: "meals",
        action: "edit",
        id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Meal Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item label="Image URL" name="image">
                    <Input />
                </Form.Item>

                <Form.Item label="Category" name="category">
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Edit>
    );
};