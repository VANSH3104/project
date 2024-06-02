import React from 'react';
import { Card } from './Cards';

export function CardShow({ cards, onEdit, onDelete }) {
  return (
    <div>
      {cards.map((car, index) => (
        <Card key={index} car={car} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
