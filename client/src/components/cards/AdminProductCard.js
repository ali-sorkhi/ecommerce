import React from "react";
import { Card } from "antd";
import Laptop from "../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

export default function AdminProductCard({ product, handleRemove }) {
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          src={images && images.length ? images[0].url : Laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <EditOutlined className="text-warning" />,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      ></Meta>
    </Card>
  );
}
