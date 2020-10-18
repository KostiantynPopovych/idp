import React, {memo, useMemo} from 'react';
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
        id="card-image"
        alt={name}
        src={imageUrl}
      />
    }
    actions={useMemo(() => ([
      <button id="delete-btn" key="Delete btn" onClick={onDeleteClick}>
        <DeleteOutlined />
      </button>,
      <button id="edit-btn" key="Edit btn" onClick={onEditClick}>
        <EditOutlined />
      </button>
    ]), [onDeleteClick, onEditClick])}
  >
    <Card.Meta
      title={name}
      description={description}
    />
  </Card>
);

export default memo(ItemCard);
