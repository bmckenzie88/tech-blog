const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//get all posts
router.get("/", (req, res) => {
  Post.findAll({
    include:[User, Comment]
  })
    .then((postData) => {
      res.json(postData);
    })
    .catch((err) => {
      res.status(500).json({ msg: "An error has occurred", err });
    });
});

//get post by id
router.get("/:id", (req, res) => {
  Post.findByPk(req.params.id,{
    include:[User, {model:Comment, include:[User]}]
  })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//create new post
router.post("/", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({message: "must be logged in"});
  }
  try {
    const newPost = await Post.create({
      title: req.body.title,
      body: req.body.body,
      post_creator: req.session.userId,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update post
router.put("/:id", (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({message: "must be logged in"});
    
  }
  Post.update(
    {
      title: req.body.title,
      body: req.body.body,
      post_creator: req.session.userId,
    },
    {
      where: {
        id: req.params.id,
        post_creator: req.session.userId
      },
    }
  )
    .then((updatedPost) => {
      if (updatedPost[0] === 0) {
        return res.status(404).json({ msg: "no post found" });
      }
      res.json(updatedPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//delete post
router.delete('/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({message: "must be logged in"});
    
  }
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
        post_creator: req.session.userId
      }
    })

    if(!post) {
      return res.status(400).json({message: "No post"})
    }
    res.status(200).json(post)
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
