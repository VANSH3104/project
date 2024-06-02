import React, { useState } from 'react';

export function CreateTodo() {
  // Initialize state variables
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div>
      <input
        id="title"
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <input
        id="desc"
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <button
        style={{ padding: 10, margin: 10 }}
        onClick={() => {
          // Make a POST request to add the todo
          fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers: { "Content-type": "application/json" }
          })
            .then(async (res) => {
              const json = await res.json();
              alert("Todo added");
              // Optionally, clear the inputs after adding the todo
              setTitle('');
              setDescription('');
            })
            .catch((err) => {
              console.error('Error adding todo:', err);
              alert('Failed to add todo');
            });
        }}
      >
        Add a todo
      </button>
    </div>
  );
}
