const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.render("pages/login");
    }
  };

export default auth;