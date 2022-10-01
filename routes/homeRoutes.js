const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: User }]
  });
  const blogData = blogs.map(b=>b.get({plain: true}))

  res.render('home', {
      blogs: blogData,
      logged_in: req.session.logged_in
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
      include: [{ model: User }]
      // plain: true
  });

  const blogData = blogs.map(b=>b.get({plain: true}))
  console.log(blogData)

  res.render('dashboard', {
      blogs: blogData,
      logged_in: req.session.logged_in
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



module.exports = router;
