const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const { generateToken } = require("../utils/users");
const secretKey = "m8F2Gf7$0lK3@uP1jR6^aS5#dH9&yT4"; // 一个长度为 32 字符的随机生成的密钥
// 注册模块
exports.create = (req, res) => {
  let status;
  if (req.body.usertype === "1") {
    status = "用户";
  } else {
    status = "管理员";
  }

  // 先查询后创建
  User.findOne({
    where: { username: req.body.username, usertype: req.body.usertype },
  })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(410).send({ message: `该${status}已存在` });
      } else {
        // User does not exist, create a new user
        return User.create({
          username: req.body.username,
          password: req.body.password,
          usertype: req.body.usertype,
        });
      }
    })
    .then((newUser) => {
      const username = req.body.username;
      const password = req.body.password;
      const usertype = req.body.usertype;
      //生成token
      const token = generateToken({ username, password, usertype }, secretKey);
      //send里面要传入一个对象 否则无法被解析
      res.status(200).send({
        token: token,
        message: `注册成功，欢迎您${status}：${username}`,
        status: 1,
        id: newUser.userId,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: `${err}` });
    });
};

// 登录查询
exports.findOne = (req, res) => {
  let status;
  if (req.body.usertype === "1") {
    status = "用户";
  } else {
    status = "管理员";
  }
  User.findOne({
    where: { username: req.body.username, usertype: req.body.usertype },
  })
    .then((data) => {
      if (data) {
        if (data.password === req.body.password) {
          const username = req.body.username;
          const password = req.body.password;
          const usertype = req.body.usertype;
          //生成token
          const token = generateToken(
            { username, password, usertype },
            secretKey
          );
          res.send({
            token: token,
            message: `登录成功，欢迎您${status}：${username}`,
            status: 1,
            id: data.userId,
          });
        } else {
          res.status(403).send({
            message: `密码错误请重新输入`,
          });
        }
      } else {
        res.status(404).send({
          message: `该${status}还未注册，请先注册`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `${err}`,
      });
    });
};

// 通过id找数据
exports.getData = (req, res) => {
  const id = req.params.id;
  console.log(689);
  console.log(id);
  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `找不到该id id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "无法进入数据库查询 id=" + id,
      });
    });
};
