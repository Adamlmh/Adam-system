const db = require("../models");

const MeetingMinutes = db.MeetingMinutes;

// 创建并保存
exports.create = (req, res) => {
  const meetingMinutes = {
    uploaderId: req.body.uploaderId,
    meetingTopic: req.body.meetingTopic,
    meetingType: req.body.meetingType,
    status: req.body.status,
    title: req.body.title,
    meetingTime: req.body.meetingTime,
    tag1: req.body.tag1,
    tag2: req.body.tag2,
    tag3: req.body.tag3,
    meetingContent: req.body.meetingContent,
    meetingPhoto: req.body.meetingPhoto,
    personalMinutes: req.body.personalMinutes,
    likes: 3,
  };

  MeetingMinutes.create(meetingMinutes)
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
exports.getMeetingData = (req, res) => {
  const id = req.params.id;
  MeetingMinutes.findAll({ where: { minutesId: id } })
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

//查询数据
exports.getData = (req, res) => {
  const id = req.params.id;
  MeetingMinutes.findAll({ where: { uploaderId: id } })
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

//查询近五条

exports.getFiveData = (req, res) => {
  MeetingMinutes.findAll({
    order: [["minutesId", "DESC"]], // 按照 uploaderId 降序排序
    limit: 5, // 限制结果数量为 5
  })
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

//更新点赞数
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  // 构建包含有要更新的字段的对象
  const updateFields = {};
  if (req.body.likes) updateFields.likes = req.body.likes;
  MeetingMinutes.update(updateFields, {
    where: { minutesId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "上传成功！",
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
