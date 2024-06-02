import React, { useState, useEffect } from 'react';
import { CardShow } from './components/cardshow';
import axios from 'axios';

function App() {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    name: '',
    description: '',
    linkedIn: '',
    twitter: '',
    otherSocial: '',
    interests: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/cards')
      .then(response => {
        console.log('Fetched cards:', response.data);
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
      });
  }, []);

  const handleEdit = (card) => {
    const newDescription = prompt('Enter new description:', card.description);
    if (newDescription) {
      axios.put(`http://localhost:3000/cards/${card._id}`, { ...card, description: newDescription })
        .then(response => {
          console.log('Updated card:', response.data);
          setCards(cards.map(c => c._id === card._id ? response.data : c));
        })
        .catch(error => console.error('Error updating card:', error));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/cards/${id}`)
      .then(() => {
        console.log('Deleted card:', id);
        setCards(cards.filter(card => card._id !== id));
      })
      .catch(error => console.error('Error deleting card:', error));
  };

  const handleAddCard = () => {
    const interestsArray = newCard.interests.split(',').map(interest => interest.trim());
    axios.post('http://localhost:3000/cards', { ...newCard, interests: interestsArray })
      .then(response => {
        console.log('Added card:', response.data);
        setCards([...cards, response.data]);
        setNewCard({
          name: '',
          description: '',
          linkedIn: '',
          twitter: '',
          otherSocial: '',
          interests: '',
        });
      })
      .catch(error => console.error('Error adding card:', error));
  };

  return (
    <div className="App">
      <h1>Business Cards</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newCard.name}
          onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCard.description}
          onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="LinkedIn"
          value={newCard.linkedIn}
          onChange={(e) => setNewCard({ ...newCard, linkedIn: e.target.value })}
        />
        <input
          type="text"
          placeholder="Twitter"
          value={newCard.twitter}
          onChange={(e) => setNewCard({ ...newCard, twitter: e.target.value })}
        />
        <input
          type="text"
          placeholder="Other Social"
          value={newCard.otherSocial}
          onChange={(e) => setNewCard({ ...newCard, otherSocial: e.target.value })}
        />
        <input
          type="text"
          placeholder="Interests (comma separated)"
          value={newCard.interests}
          onChange={(e) => setNewCard({ ...newCard, interests: e.target.value })}
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
      <CardShow cards={cards} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
