const { Article } = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");

function customDateFormat(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

const home = async (req, res) => {
  const { success, error } = req.flash();
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword || "";
  const itemPerPage = 4;
  const articles = await Article.findAndCountAll({
    where: {
      [Op.or]: [
        {
          titleArticle: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          bodyArticle: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          writer: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
    limit: itemPerPage,
    offset: (page - 1) * itemPerPage,
    order: [["createdAt", "DESC"]],
  });
  for (const item of articles.rows) {
    item.dataValues.createdAt = customDateFormat(item.dataValues.createdAt);
  }
  res.render("", {
    data: articles.rows,
    currentPage: page,
    totalPage: Math.ceil(articles.count / itemPerPage),
    nextPage: page + 1,
    previousPage: page - 1 == 0 ? 1 : page - 1,
    keyword: keyword,
    success: success,
    error: error,
  });
};

const viewArticle = async (req, res) => {
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

const editArticle = async (req, res) => {
  const idTitle = req.params.id;
  const articles = await Article.findOne({
    where: {
      uuid: idTitle,
    },
  });
  articleDate = customDateFormat(articles.createdAt);
  res.render("editArticle", {
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
  try {
    const { email, title, article } = req.body;
    const newArticle = await Article.create({
      writer: email,
      titleArticle: title,
      bodyArticle: article,
      banner: req.file ? req.file.filename : null,
    });
    if (newArticle) {
      req.flash("success", "Your article successfully created");
      res.redirect("/");
    }
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    req.flash("error", error.message);
    res.redirect("/");
  }
};

const updateArticle = async (req, res) => {
  try {
    const { uuid, email, title, article } = req.body;
    const oldArticle = await Article.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!req.file) {
      const newArticle = await oldArticle.update({
        writer: email != "" ? email : oldArticle.writer,
        titleArticle: title != "" ? title : oldArticle.titleArticle,
        bodyArticle: article != "" ? article : oldArticle.bodyArticle,
      });
      if (newArticle) {
        req.flash("success", "Your article successfully updated");
        res.redirect("/");
      }
    } else {
      const image = req.file.filename;
      const newArticle = await Article.update(
        {
          writer: email != "" ? email : oldArticle.writer,
          titleArticle: title != "" ? title : oldArticle.titleArticle,
          bodyArticle: article != "" ? article : oldArticle.bodyArticle,
          banner: image,
        },
        {
          where: {
            uuid: uuid,
          },
        }
      );
      if (oldArticle.banner != null) {
        fs.rmSync(__dirname + "/../public/assets/img/" + oldArticle.banner);
      }
      if (newArticle) {
        req.flash("success", "Your article successfully updated");
        res.redirect("/");
      }
    }
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    req.flash("error", error.message);
    res.redirect("/");
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const oldArticle = await Article.findByPk(id);
    if (oldArticle.banner != null) {
      try {
        fs.rmSync(__dirname + "/../public/assets/img/" + oldArticle.banner);
      } catch (error) {
        console.log(error);
      }
      await Article.destroy({
        where: {
          uuid: id,
        },
      });
    } else {
      await Article.destroy({
        where: {
          uuid: id,
        },
      });
    }
    req.flash("success", "Your article successfully deleted");
    res.redirect("/");
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    req.flash("error", error.message);
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

module.exports = { home, about, contact, writeArticle, createArticle, viewArticle, editArticle, updateArticle, deleteArticle };
