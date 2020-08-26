import express from 'express';
import bcrypt from 'bcrypt';

import sessionUserChecker from '../middleware/sessionUserChecker.js';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/', sessionUserChecker, (req, res) => {
  res.render('registrationForm');
})

router.post('/', async (req, res) => {
  const {
    userName,
    userPassword,
    userEmail,
  } = req.body;
  try {
    const newUser = new User({
      userName: userName,
      userPassword: await bcrypt.hash(userPassword, 10),
      userEmail,
    });
    await newUser.save();
    req.session.user = newUser;
    // res.json({ok: 'ok'});
    res.redirect('/fdsfdsfdsf');
  } catch (error) {
    res.render('errors', { err: 'Пользователь уже существует или данные не верны!' });
  }
})

export default router;
