const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      plain: true
  });

  res.render('home', {
      blogs,
  });

  } catch (err) {
    res.status(500).json(err);
  }
});
// add logic or middleware to check whether user is logged in or not
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {user_id: req.session.user_id},
      plain: true
  });

  res.render('dashboard', {
      blogs,
  });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.post('/login', async (req, res) => {

  try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res.status(400).render('login', {
          error: "Email or password is invalid. Please try again."
      })
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
          res.status(400).render('login', {
              error: "Email or password is invalid. Please try again."
      })
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.redirect('/');
      });
  
  } catch (err) {
      res.status(400).render('login', {
          error: "Email or password is invalid. Please try again."
      })
  };

});

module.exports = router;
