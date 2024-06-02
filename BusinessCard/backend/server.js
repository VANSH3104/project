// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createCard, updateCard } = require('./create'); 

const app = express();
const port = 3000;

mongoose.connect('mongo server', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

const cardSchema = new mongoose.Schema({
  name: String,
  description: String,
  linkedIn: String,
  twitter: String,
  otherSocial: String,
  interests: [String],
});

const Card = mongoose.model('Card', cardSchema);

app.use(cors());
app.use(express.json());

app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (error) {
    res.status(500).json({ msg: 'Problem in showing cards', error: error.message });
  }
});

app.post('/cards', async (req, res) => {
  const newCard = req.body;
  const parseCard = createCard.safeParse(newCard);

  if (!parseCard.success) {
    return res.status(400).json({ msg: 'Problem in post', error: parseCard.error.errors });
  }

  try {
    const card = new Card(newCard);
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ msg: 'Error creating card', error: error.message });
  }
});

app.put('/cards/:id', async (req, res) => {
  const cardId = req.params.id;
  const updateData = req.body;
  const parseUpdate = updateCard.safeParse(updateData);

  if (!parseUpdate.success) {
    return res.status(400).json({ msg: 'Problem in update', error: parseUpdate.error.errors });
  }

  try {
    const updatedCard = await Card.findByIdAndUpdate(cardId, updateData, { new: true });
    if (!updatedCard) {
      return res.status(404).json({ msg: 'Card not found' });
    }
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ msg: 'Error updating card', error: error.message });
  }
});

app.delete('/cards/:id', async (req, res) => {
  const cardId = req.params.id;

  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return res.status(404).json({ msg: 'Card not found' });
    }
    res.json({ msg: 'Card deleted', deletedCard });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting card', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
