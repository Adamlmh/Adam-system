const db = require("../models");

const MeetingMinutes = db.MeetingMinutes;

// 创建并保存
exports.create = (req, res) => {
  const meetingMinutes = {
    uploaderId: req.body.uploaderId,
    uploaderName: req.body.uploaderName,
    uploaderGroup: req.body.uploaderGroup,
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
