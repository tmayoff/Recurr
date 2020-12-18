import auth from './auth';
import { Router } from 'express';
import passport from 'passport';
var router = Router();

/* GET home page. */
router.get('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;
  if (user) {
    res.render("index");
  } else {
    res.redirect("login");
  }
});

router.get('/login', auth.optional, (req, res, next) => {

  res.render("login");
});

router.post('/login', auth.optional, (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Errors
  let errors = {};
  if (!email)
    errors.email = "Email is required";
  if (!password)
    errors.password = "Password is required";
  if (!email || !password)
    return res.render("login", errors);

  // Authenticate user
  passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err)
      return next(err);

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() })
    }

    return status(400).info;
  })(req, res, next);

  res.render("login", errors);
})

router.get('/register', auth.optional, (req, res, next) => {
  res.render("login");
});

export default router;