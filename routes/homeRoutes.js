const router = require("express").Router();
const { Post, User, Comment } = require("../models");


router.get("/", async (req, res) => {
    // Shows all posts
    try {
      const postData = await Post.findAll({
        where: {
          isPrivate: false,
        },
        include: [User],
      });
  
      // serialize
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router