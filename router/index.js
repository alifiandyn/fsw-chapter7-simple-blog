const router = require("express").Router();
const uploadImage = require("../utils/uploadImage");
const { home, about, contact, writeArticle, createArticle, viewArticle, editArticle, updateArticle, deleteArticle } = require("../controller/");

router.get("/", home);
router.get("/post/:id", viewArticle);
router.get("/about", about);
router.get("/contact", contact);
router.get("/writeArticle", writeArticle);
router.get("/editArticle/:id", editArticle);
router.get("/deleteArticle/:id/", deleteArticle);
router.post("/createArticle", uploadImage.single("banner"), createArticle);
router.post("/editArticle/", uploadImage.single("banner"), updateArticle);

module.exports = router;
