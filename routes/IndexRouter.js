
import express from 'express';

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
  res.send('privet')
})

export default router;
