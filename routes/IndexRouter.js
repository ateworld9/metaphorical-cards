
import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import Card from '../models/cardModel.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/errors', (req, res) => {
  res.render('errors')
})

router.get('/logout', async (req, res) => {
  if (req.session.user) {
    await req.session.destroy();
    res.clearCookie('user_sid');
    res.redirect('/');
  }
});

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res) => {
  const { userEmail, userPassword } = req.body;
  // console.log(userEmail, userPassword);
  try {
  const findUser = await User.findOne({ userEmail });
  console.log(findUser);
  if (!findUser) {
    throw new Error('user not found');
  }
    if (findUser && await bcrypt.compare(userPassword, findUser.userPassword)) {
      req.session.user = findUser;
      res.json({loginSuccess: true});
    }
  } catch (error) {
    res.json({loginSuccess: false, errorMessage: error.message})
  }
})

router.get('/test', async (req, res) => {
 let deck1 = await Card.find({ deckTitle: 'deck1'});
 console.log(deck1);
 let { picturePath } = deck1[0];
 res.render('cards', { picturePath })
})

export default router;
