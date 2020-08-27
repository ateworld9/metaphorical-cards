import express from 'express';
import Card from '../models/cardModel.js';

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    let deck1 = await Card.find({ deckTitle: 'deck1' });
    // console.log(deck1);
    let { picturePath1 } = deck1[0];
    let { picturePath2 } = deck1[0];
    let { coverPath } = deck1[0]
    let deck2 = await Card.find({ deckTitle: 'deck2' });
    let picturePath12 = deck2[0].picturePath1;
    let picturePath22 = deck2[0].picturePath2;
    let coverPath2 = deck2[0].coverPath;
    res.render('gameGround', { picturePath1, picturePath2, coverPath, picturePath12, picturePath22, coverPath2 })
  })

export default router;
