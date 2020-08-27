import mongoose from 'mongoose';
import Card from './models/cardModel.js';

mongoose.connect('mongodb://localhost:27017/metaphorical-cards', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

async function createDeck () {
let deck1 = await new Card ({
  deckTitle: 'deck1',
  coverPath: '/img/deck1/cover.jpg',
  picturePath: [ '/img/deck1/dolfin.jpg', '/img/deck1/paris.jpg', '/img/deck1/sea.jpg', '/img/deck1/tiger.jpeg']
});
await deck1.save();
// console.log(deck1);
}

createDeck();