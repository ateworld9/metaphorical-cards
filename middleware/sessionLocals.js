export default function (req, res, next) {
  // console.log(`Welcom`, req.session.user);
  res.locals.user = req.session.user;
  next();
}
