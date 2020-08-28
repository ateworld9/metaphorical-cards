import mongoose from 'mongoose';
import Card from './models/cardModel.js';

mongoose.connect('mongodb://localhost:27017/metaphorical-cards', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

async function createDeck() {
  const deck1 = await new Card({
    deckTitle: 'deck1',
    coverPath: '/img/deck1/cover.jpg',
    picturePath1: ['/img/deck1/1. Phone.jpg', '/img/deck1/2. Flashlight.jpg', '/img/deck1/3. Mirror.jpg', '/img/deck1/4. Book.jpg'],
    picturePath2: ['/img/deck1/5. Car.jpg', '/img/deck1/6. Elevator.jpg', '/img/deck1/7. Flower.jpg', '/img/deck1/8. Refrigerator.jpg']
  });
  const deck2 = await new Card({
    deckTitle: 'deck2',
    coverPath: '/img/deck2/cover.jpg',
    picturePath1: ['/img/deck2/9. Candy.jpg', '/img/deck2/10. Box.jpg', '/img/deck2/11. Armchair.jpg', '/img/deck2/12. Sunglasses.jpg'],
    picturePath2: ['/img/deck2/13. Bed.jpg', '/img/deck2/14. Shower.jpg', '/img/deck2/15. Bridge.jpg', '/img/deck2/16. Scissors.jpg'],
  });
  await deck1.save();
  await deck2.save();
  // console.log(deck1);
}

createDeck();
