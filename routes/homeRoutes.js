const router = require("express").Router();
const { Post, User, Comment } = require("../models");

//show all posts - for homepage
router.get("/", async (req, res) => {
  // Shows all posts
  try {
    const postData = await Post.findAll({
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

// login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect(`/`);
  }
  res.render("login", {
    loggedIn: false,
    userId: null,
  });
});

// logout
router.get("/logout", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else if (req.session.loggedIn) {
    req.session.destroy();
    res.redirect("/");
  } else {
    res.status(404).end();
  }
});

// signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect(`/`);
  }
  res.render("signup", {
    loggedIn: false,
    userId: null,
  });
});

//session timeout
// router.get("/users/", (req, res) => {
//   if (!req.session.loggedIn) {
//     return res.redirect(`/login`);
//   }
//   res.render("login", {
//     loggedIn: false,
//     userId: null,
//   });
// });

//dashboard
router.get("/users/:id", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect(`/login`);
  }
  User.findByPk(req.params.id, {
    include: [Post, Comment],
  }).then((foundUser) => {
    const hbsUser = foundUser.get({ plain: true });
    hbsUser.loggedIn = true;
    hbsUser.userId = req.session.userId;
    if (hbsUser.id === req.session.userId) {
      hbsUser.isMyProfile = true;
      res.render("dashboard", hbsUser);
    }
  });
});

// Shows one post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        User,
        {
          model: Comment,
          include: User,
        },
      ],
    });

    if (postData) {
      // serialize
      const post = postData.get({ plain: true });
      console.log(post);
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        sessId: req.sessionID,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// new-post
router.get("/new-post", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect(`/login`);
  }
  res.render("new-post", {
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
    sessId: req.sessionID,
  });
});

router.get("*",(req,res) =>{
  res.render("404")
})

module.exports = router;
