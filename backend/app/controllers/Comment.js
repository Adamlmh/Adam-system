const db = require("../models");

const comment = db.Comment;

// 创建并保存
exports.create = (req, res) => {
  const COMMENT = {
    minutesId: req.body.minutesId,
    commenterId: req.body.commenterId,
    commentContent: req.body.commentContent,
    parentCommentId: req.body.parentCommentId,
    likeCount: req.body.likeCount,
  };

  comment
    .create(COMMENT)
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
  const id = parseInt(req.params.id);

  comment
    .findAll({ where: { minutesId: id } })
    .then((data) => {
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
  if (req.body.likeCount) updateFields.likeCount = req.body.likeCount;
  comment
    .update(updateFields, {
      where: { commentId: id },
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
//删除会议纪要对应的评论
exports.delete = (req, res) => {
  const id = req.params.id;

  comment
    .destroy({
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
