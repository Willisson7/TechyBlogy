const User = require('./user');
const Article = require('./article');
const Comment = require('./Comment')

User.hasMany(Article, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Article.belongsTo(User, {
  foreignKey: 'user_id'
});

Article.hasMany(Comment, {
  foreignKey: 'article_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Article, {
  foreignKey: 'article_id',
});
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Article, Comment };
