module.exports = (app) => {
  let express = require("express");
  let router = express.Router();

  const multer = require("multer");
  // 临时上传目录
  let upload = multer({ dest: "uploads_files" });

  let baseURL = "http://localhost:8080/backend/app/";
  console.log(8848);
  router.post("/", upload.single("file"), function (req, res, next) {
    if (!req.file) {
      return res.status(400).send({ message: "没有上传文件" });
    }

    let imagePath = baseURL + "/uploads_files/" + req.file.filename;

    return res.status(200).send({ imagePath: imagePath });
  });

  app.use("/api/upload", router);
};
