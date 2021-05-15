import React from "react";
import { Card } from "antd";

const { Meta } = Card;

export default function AdminProductCard({ product }) {
  const { title, description, images } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ""}
          style={{ height: "150px", objectFit: "cover" }}
          className="m-2"
        />
      }
    >
      <Meta title={title} description={description}></Meta>
    </Card>
  );
}