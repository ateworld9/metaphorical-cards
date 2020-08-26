const sessionUserChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};

export default sessionUserChecker;
