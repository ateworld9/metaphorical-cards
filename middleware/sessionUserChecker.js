const sessionUserChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/game");
  } else {
    next();
  }
};

export default sessionUserChecker;
