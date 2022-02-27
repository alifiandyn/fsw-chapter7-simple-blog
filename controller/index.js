const { Article } = require("../models");

function customDateFormat(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

const home = async (req, res) => {
  const articles = await Article.findAll();
  res.render("", {
    data: articles,
  });
};

const post = async (req, res) => {
  const idTitle = req.params.id;
  const articles = await Article.findOne({
    where: {
      uuid: idTitle,
    },
  });
  articleDate = customDateFormat(articles.createdAt);
  res.render("post", {
    data: articles,
    articleDate,
  });
};

const about = (req, res) => {
  res.render("about");
};

const contact = (req, res) => {
  res.render("contact");
};

const writeArticle = (req, res) => {
  res.render("writeArticle");
};

const createArticle = async (req, res) => {
  const { email, title, article } = req.body;
  try {
    const newArticle = await Article.create({
      writer: email,
      titleArticle: title,
      bodyArticle: article,
    });
    if (newArticle) {
      res.redirect("/");
    }
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.redirect("/");
  }
};

// const createArticle = (req, res) => {
//   const { email, title, article } = req.body;

//   Article.create({
//     writer: email,
//     titleArticle: title,
//     bodyArticle: article,
//   })
//     .then((data) => {
//       console.log(data);
//       res.redirect("/");
//     })
//     .catch((error) => {
//       console.log(error);
//       res.redirect("/");
//     });
// };

module.exports = { home, post, about, contact, writeArticle, createArticle };
