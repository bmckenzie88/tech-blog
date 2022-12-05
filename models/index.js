const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


User.hasMany(Post, {
  foreignKey: 'post_creator',
  onDelete: 'CASCADE'
});
User.hasMany(Comment, {
  foreignKey: 'comment_creator',
  onDelete: 'CASCADE'
});
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});


Post.belongsTo(User, {
  foreignKey: 'post_creator'
});
Comment.belongsTo(User, {
  foreignKey: 'comment_creator'
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };