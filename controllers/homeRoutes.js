const router = require('express').Router();
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/auth');




// Get All Articles
router.get('/', async (req, res) => {
  try {
    res.redirect('/homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/homepage', async (req, res) => {
  try {
    const articleData = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });


    const articles = articleData.map((article) => article.get({ plain: true }));


    res.render('homepage', {
      articles,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Get one Article by Id
router.get('/article/:id', async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'date_created', 'comment_text', 'article_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
          }
        }
      ],
    });

    // redirect user if already logged in to update 
    const article = articleData.get({ plain: true });

    if (article.user_id == req.session.user_id) {
      res.redirect('/article/' + article.id);
      return;
    }

    res.render('eArticle', {
      ...article,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Article }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
