// components/MemeCard.jsx
import React from "react";
import { Card } from "antd";
import "antd"; // Make sure it's included globally if not

const { Meta } = Card;

const MemeCard = ({ meme }) => {
  return (
    <Card
      hoverable
      style={{ width: 240, margin: "1rem" }}
      cover={<img alt={meme.title} src={meme.imageUrl.url} />}
    >
      <Meta title={meme.title} description={meme.tags.join(", ")} />
    </Card>
  );
};

export default MemeCard;
