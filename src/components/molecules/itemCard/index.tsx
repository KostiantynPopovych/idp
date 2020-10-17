import React, { memo } from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';

interface Props {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onSaveClick: () => void;
}

const cardStyles = { width: 240 };

const ItemCard = ({ name, description, imageUrl, onDeleteClick, onEditClick, onSaveClick }: Props) => (
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
      </button>,
      <button key="Save btn" onClick={onSaveClick}>
        <StarOutlined />
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
