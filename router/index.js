const router = require("express").Router();
const { home, post, about, contact, writeArticle, createArticle } = require("../controller/");

router.get("/", home);
router.get("/post/:id", post);
router.get("/about", about);
router.get("/contact", contact);
router.get("/writeArticle", writeArticle);

router.post("/createArticle", createArticle);

module.exports = router;
