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
    uploaderName: req.body.uploaderName,
    uploaderGroup: req.body.uploaderGroup,
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

// 查询数据
exports.getMeetingData = (req, res) => {
  const id = req.params.id;
  MeetingMinutes.findAll({ where: { minutesId: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// 查询数据  用户展示全部已通过审核的会议内容
exports.getLatestMeetingData = (req, res) => {
  const id = parseInt(req.params.id) || 1; // 解析查询参数中的 id，如果没有提供，则默认为 1
  console.log(id);
  MeetingMinutes.findOne({
    where: { status: "通过" },
    order: [["createdAt", "DESC"]], // 按照 createdAt 列降序排序
    offset: id - 1, // 设置偏移量为 id - 1
    limit: 1, // 限制只获取一条数据
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "到我的底线了",
        });
        return;
      }
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
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//更新点赞数/审核意见/审核结果
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  console.log(typeof id);
  // 构建包含有要更新的字段的对象
  const updateFields = {};
  if (req.body.likes) updateFields.likes = req.body.likes;
  if (req.body.status) updateFields.status = req.body.status;
  if (req.body.reviewComments)
    updateFields.reviewComments = req.body.reviewComments;
  MeetingMinutes.update(updateFields, {
    where: { minutesId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "操作成功！",
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

//查询所有数据
exports.getAllData = (req, res) => {
  MeetingMinutes.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
//管理员删除会议纪要
exports.delete = (req, res) => {
  const id = req.params.id;

  MeetingMinutes.destroy({
    where: { minutesId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "删除成功",
        });
      } else {
        res.send({
          message: `没找到 id=${id}. `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "删除失败 id=" + id,
      });
    });
};
