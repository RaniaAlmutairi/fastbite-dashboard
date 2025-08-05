import React from "react";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/antd";

import { Descriptions, Image } from "antd";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

<Helmet>
  <title>FastBite | Meal Details</title>
  <meta name="description" content="View detailed information about a specific meal in the admin panel." />
</Helmet>

export const MealsShow: React.FC = () => {
    const { id } = useParams();

    const { queryResult } = useShow({
        resource: "meals",
        id, 
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Descriptions title="Meal Details" bordered column={1}>
                <Descriptions.Item label="Name">
                    {record?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Price">
                    {record?.price}
                </Descriptions.Item>
                <Descriptions.Item label="Category">
                    {record?.category}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    {record?.description}
                </Descriptions.Item>
                <Descriptions.Item label="Image">
                    {record?.image ? (
                        <Image src={record.image} width={200} />
                    ) : (
                        "No image"
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="ID">
                    {record?.id}
                </Descriptions.Item>
            </Descriptions>
        </Show>
    );
};
