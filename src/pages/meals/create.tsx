import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { useNotification, useNavigation } from "@refinedev/core"; 
import { Form, Input } from "antd";

export const MealsCreate: React.FC = () => {
    const { open } = useNotification(); 
    const { push } = useNavigation();

    const { formProps, saveButtonProps } = useForm({
        resource: "meals",
        redirect: false,
        onMutationSuccess: () => {
            open?.({
                type: "success",
                message: "تمت الإضافة بنجاح",
                description: "تمت إضافة الوجبة إلى القائمة.",
            });
            push("/");
        },
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Meal Name" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true }]}>
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
        </Create>
    );
};
