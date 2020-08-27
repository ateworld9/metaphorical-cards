import express from 'express';
import Card from '../models/cardModel.js';

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const deck1 = await Card.find({ deckTitle: 'deck1' });
    // console.log(deck1);
    const { picturePath1 } = deck1[0];
    const { picturePath2 } = deck1[0];
    const { coverPath } = deck1[0];
    const deck1Id = deck1[0]._id.toString();
    const deck2 = await Card.find({ deckTitle: 'deck2' });
    const picturePath12 = deck2[0].picturePath1;
    const picturePath22 = deck2[0].picturePath2;
    const coverPath2 = deck2[0].coverPath;
    const deck2Id = deck2[0]._id.toString();
    // console.log(typeof deck2Id);
    res.render('gameGround', {
      picturePath1,
      picturePath2,
      coverPath,
      picturePath12,
      picturePath22,
      coverPath2,
      deck2Id,
      deck1Id,
    });
  });

router.get('/:id', async (req, res) => {
  const deck = await Card.find({ _id: req.params.id });
  // console.log(deck);
  const { picturePath1, picturePath2 } = deck[0];
  // console.log(picturePath1, picturePath2);
  res.json({ picturePath1, picturePath2 });
});

export default router;
