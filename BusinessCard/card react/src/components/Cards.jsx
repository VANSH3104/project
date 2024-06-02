import React from 'react';

export function Card({ car, onEdit, onDelete }) {
  return (
    <div>
      <h2>{car.name}</h2>
      <p>{car.description}</p>
      <div>
        {car.linkedIn && (
          <a href={car.linkedIn} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        )}
        {car.twitter && (
          <a href={car.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        )}
        {car.otherSocial && (
          <a href={car.otherSocial} target="_blank" rel="noopener noreferrer">
            Other
          </a>
        )}
      </div>
      <div>
        <h4>Interests</h4>
        <ul>
          {car.interests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => onEdit(car)}>Edit</button>
        <button onClick={() => onDelete(car._id)}>Delete</button>
      </div>
    </div>
  );
}
