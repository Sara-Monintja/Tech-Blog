const router = require('express').Router();

// contains auth


// login page
router.get('/login', (req,res) => {
    res.render("login")
});

// post login (for user to login)


// signup page


// post (for user to actually signup)

module.exports = router;