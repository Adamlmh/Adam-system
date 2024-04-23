const db = require("../models");

const Feedback = db.Feedback;

// 创建并保存
exports.create = (req, res) => {
  const feedback = {
    submitterId: req.body.submitterId,
    feedbackSubject: req.body.feedbackSubject,
    feedbackType: req.body.feedbackType,
    feedbackContent: req.body.feedbackContent,
    status: req.body.status,
    commenterName: req.body.commenterName,
    commenterGroup: req.body.commenterGroup,
  };

  Feedback.create(feedback)
    .then((data) => {
      res.status(200).send({
        message: "上传成功！",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//查询数据
exports.getData = (req, res) => {
  const id = req.params.id;
  Feedback.findAll({ where: { submitterId: id } })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
//查询所有数据
exports.getAllData = (req, res) => {
  Feedback.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
