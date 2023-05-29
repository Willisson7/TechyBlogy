const router = require('express').Router();
const { Article } = require('../../models');
const withAuth = require('../../utils/auth');

// create new Article
router.post('/', withAuth, async (req, res) => {
  try {
    const newArticle = await Article.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newArticle);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update existing Article
router.put('/:id', withAuth, async (req, res) => {
  try {
    const eArticle = await Article.update({
      title: req.body.title,
      content: req.body.content,
    },
      {
        where: {
          id: req.params.id,
        }
      }
    );
    res.status(200).json(eArticle);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete Article
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!articleData) {
      res.status(404).json({ message: 'No Article found with this id!' });
      return;
    }

    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
