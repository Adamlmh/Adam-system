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

//查询submitter数据
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
//查询submitter数据
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

//查询feedbackId数据
exports.getfeedbackIdData = (req, res) => {
  const id = req.params.id;

  Feedback.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `找不到这个意见 id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "发生错误 id=" + id,
      });
    });
};

//更新处理意见和状态
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  // 构建包含有要更新的字段的对象
  const updateFields = {};
  if (req.body.processingComments)
    updateFields.processingComments = req.body.processingComments;
  if (req.body.status) updateFields.status = req.body.status;
  Feedback.update(updateFields, {
    where: { feedbackId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "点评成功！",
        });
      } else {
        res.send({
          message: `无法上传该id=${id}. 上传为空值`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "上传失败",
      });
    });
};
//查询待回复数据
exports.getfeedbackStatus = (req, res) => {
  console.log(123);
  Feedback.findAll({ where: { status: "待回复" } })
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
