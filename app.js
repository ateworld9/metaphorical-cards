import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStoreGeneral from 'session-file-store';

import passport from 'passport';

import VKontakteStr from 'passport-vkontakte';
import User from './models/userModel.js';
import useErrorHandlers from './middleware/error-handlers.js';
import sessionLocals from './middleware/sessionLocals.js';
import indexRouter from './routes/IndexRouter.js';
import registrationRouter from './routes/registrationRouter.js';
import gameRouter from './routes/gameRouter.js';
// import passportSession from 'passport-session';
// const GitHubStrategy =

const app = express();
const FileStore = FileStoreGeneral(session);
dotenv.config();

const VKontakteStrategy = VKontakteStr.Strategy;

passport.use(new VKontakteStrategy({
  clientID: process.env.VKONTAKTE_CLIENT_ID,
  clientSecret: process.env.VKONTAKTE_CLIENT_SECRET,
  callbackURL: process.env.VKONTAKTE_CALLBACK_URL,
},
  (async (accessToken, refreshToken, params, profile, done) => {
    console.log('profile', profile);
    // console.log('tokken', accessToken );
    const user = await User.findOrCreate(profile, (err, user) =>
      // console.log(user);
      done(err, user));
    return user;
  })));

app.get('/auth/vkontakte',

  passport.authenticate('vkontakte'),
  // function(req, res){
  //   console.log('!!!!!!!');
  // }
);

app.get('/auth/vkontakte/callback',
  passport.authenticate('vkontakte', {
    failureRedirect: '/login',
    // successRedirect: '/game',
    session: false,
  }),
  (req, res) => {
    console.log(req.user, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log(req.session);
    res.redirect('/game');
    // req.session.user = req.user;
  });

app.set('view engine', 'hbs');
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'kataus litcom po klave',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24 * 365,
    },
  }),
);

// passport.use(new GitHubStrategy({
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL:

//     function (accessToken, refreshToken, profile, done) {
//       process.nextTick(async function () {
//         let gituser = await User.findOne({ githubID: profile.id });
//         console.log(user, 'user exist');

//         if (!gituser) {
//           gituser = new User({ githubID: profile.id, name: profile.userName })
//           await gituser.save();
//           console.log(gituser, "user new");
//         }
//       })

//       return done(null, user)
//     }
// }
// ));

// app.get('/login/github',
//   passport, authentication('github', {
//     scope: ['user:email'],
//     successRedirect: '/game',
//     failureRedirect: '/login'
//   })
// )

// app.get('/auth/github/callback',
//   passport.authenticate('github', { successRedirect: '/game', failureRedirect: '/login' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/game');
//   });

app.use(sessionLocals);
// app.use(cookiesCleaner);
app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/game', gameRouter);

useErrorHandlers(app);

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`${port} is alive!`);
  try {
    mongoose.pluralize(null);
    mongoose.connect('mongodb://localhost:27017/metaphorical-cards', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log('Db connection failed', error);
  }
});
