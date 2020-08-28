const sessionUserChecker = (req, res, next) => {
  if (req.user) {
    res.redirect("/game");
  } else {
    next();
  }
};

const sessionUserUnChecker = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

export { sessionUserChecker, sessionUserUnChecker };
