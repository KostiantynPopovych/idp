import React, { memo } from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const cardStyles = { width: 240 };

const ItemCard = ({ name, description, imageUrl, onDeleteClick, onEditClick }: Props) => (
  <Card
    style={cardStyles}
    cover={
      <img
        alt={name}
        src={imageUrl}
      />
    }
    actions={[
      <button key="Delete btn" onClick={onDeleteClick}>
        <DeleteOutlined />
      </button>,
      <button key="Edit btn" onClick={onEditClick}>
        <EditOutlined />
      </button>
    ]}
  >
    <Card.Meta
      title={name}
      description={description}
    />
  </Card>
);

export default memo(ItemCard);
