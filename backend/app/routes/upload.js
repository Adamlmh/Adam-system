module.exports = (app) => {
  const user = require("../controllers/user");
  let express = require("express");
  let router = express.Router();

  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  // 创建一个自定义的存储引擎
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 设置上传文件的目录为 "uploads/"
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      // 根据文件的 MIME 类型来确定文件的拓展名
      const ext = "." + file.mimetype.split("/")[1];
      // 生成一个随机的文件名
      const randomName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      // 使用拓展名和随机文件名生成最终的文件名
      const filename = randomName + ext;
      // 生成相对路径
      const relativePath = path.join("uploads", filename);
      // 将相对路径传递给回调函数
      cb(null, filename, relativePath);
    },
  });

  // 创建 multer 实例并传入自定义的存储引擎
  const upload = multer({ storage: storage });

  // 处理单个文件上传的路由
  router.post("/", upload.single("file"), (req, res) => {
    // 文件已经上传到服务器，现在可以在req.file中访问它
    console.log(req.file.filename);
    res.status(200).send({ message: `${req.file.filename}` });
  });

  app.use("/upload", router);
};
