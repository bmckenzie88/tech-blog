const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

//get all comments
router.get("/", (req, res) => {
  Comment.findAll({
    include: [User, Post],
  })
    .then((commentData) => {
      res.json(commentData);
    })
    .catch((err) => {
      res.status(500).json({ msg: "An error has occurred", err });
    });
});

//get comment by id
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id, {
    include: [User, Post],
  })
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//create new comment
router.post("/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ message: "must be logged in" });
  }
  try {
    const newComment = await Comment.create({
      body: req.body.body,
      comment_creator: req.session.userId,
      post_id: req.params.id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

//update comment
router.put("/:id", (req, res) => {
    if (!req.session.loggedIn) {
      return res.status(401).json({message: "must be logged in"});
      
    }
    Comment.update(
      {
        body: req.body.body,
        comment_creator: req.session.userId,
      },
      {
        where: {
          id: req.params.id,
          comment_creator: req.session.userId
        },
      }
    )
      .then((updatedComment) => {
        if (updatedComment[0] === 0) {
          return res.status(404).json({ msg: "no comment found" });
        }
        res.json(updatedComment);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: err });
      });
  });
  
  //delete comment
  router.delete('/:id', async (req, res) => {
    if (!req.session.loggedIn) {
      return res.status(401).json({message: "must be logged in"});
      
    }
    try {
      const comment = await Comment.destroy({
        where: {
          id: req.params.id,
          comment_creator: req.session.userId
        }
      })
  
      if(!comment) {
        return res.status(400).json({message: "No comment"})
      }
      res.status(200).json(comment)
    } catch (err) {
      console.log(err)
    }
  });

module.exports = router;
