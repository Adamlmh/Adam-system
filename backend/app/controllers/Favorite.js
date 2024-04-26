const db = require("../models");

const favorite = db.Favorite;

// 创建并保存
exports.create = (req, res) => {
  const FAVORITE = {
    minutesId: req.body.minutesId,
    userId: req.body.userId,
  };

  favorite
    .create(FAVORITE)
    .then((data) => {
      res.status(200).send({
        message: "收藏成功！",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//查询收藏数据（一个个拿）
exports.getData = (req, res) => {
  const userId = parseInt(req.params.userId);
  const minutesId = parseInt(req.params.minutesId);

  favorite
    .findOne({ where: { userId: userId, minutesId: minutesId } }) // 使用复合条件查找数据
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "没找到该收藏" });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//删除会议纪要对应的收藏
exports.delete = (req, res) => {
  const userId = parseInt(req.params.userId);
  const minutesId = parseInt(req.params.minutesId);

  favorite
    .destroy({ where: { userId: userId, minutesId: minutesId } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "删除成功",
        });
      } else {
        res.send({
          message: `没找到 minutesId=${minutesId}. `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "删除失败 minutesId=" + minutesId,
      });
    });
};
// 查询数据  用户展示全部已通过审核的会议内容
exports.getLatestFavoriteData = (req, res) => {
  const id = parseInt(req.params.id) || 1; // 解析查询参数中的 id，如果没有提供，则默认为 1
  const userId = parseInt(req.params.userId);
  favorite
    .findOne({
      where: { userId: userId },
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
