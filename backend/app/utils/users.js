//token函数
const crypto = require("crypto");
const secretKey = "m8F2Gf7$0lK3@uP1jR6^aS5#dH9&yT4"; // 一个长度为 32 字符的随机生成的密钥
const db = require("../models");
const User = db.user;
//生成Token
//三个参数 分别是需要加密的数据 用于签名的密钥 过期时间
const generateToken = function generateToken(payload, secretKey, expiresIn) {
  const header = Buffer.from(
    JSON.stringify({ typ: "JWT", alg: "HS256" })
  ).toString("base64");
  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString(
    "base64"
  );
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(`${header}.${payloadEncoded}`) // 修复：使用 payloadEncoded 而不是 payload
    .digest("base64");
  const expiresInSeconds = expiresIn ? expiresIn : 3600;
  const expiration = Math.floor(Date.now() / 1000) + expiresInSeconds;
  return `${header}.${payloadEncoded}.${signature}.${expiration}`;
};

function verifyToken(token, secretKey) {
  const [header, payloadBase64, signatureBase64, expiration] = token.split(".");
  const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString());
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(`${header}.${payloadBase64}`)
    .digest("base64");
  const currentTimestamp = Math.floor(Date.now() / 1000);
  console.log(123);
  console.log(signatureBase64);
  console.log(signature);
  if (
    currentTimestamp > parseInt(expiration) ||
    signature !== signatureBase64
  ) {
    return null; // Token 已过期或签名不匹配
  }
  return payload; // 返回解码后的 payload
}

const validateToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.substring(7); // 去掉 'Bearer ' 前缀，得到令牌值
    console.log(token);
    console.log(req.body);
    // 在这里对令牌进行验证
    const tokenPayload = verifyToken(token, secretKey);
    console.log(tokenPayload);
    // 如果令牌验证成功，将 req.user 设置为令牌中的用户信息  (待验证)
    User.findOne({
      where: {
        username: tokenPayload.username,
        password: tokenPayload.password,
        usertype: tokenPayload.usertype,
      },
    })
      .then((data) => {
        next();
      })
      //验证失败
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: `${err}`,
        });
      });
  } // 继续处理请求
  else {
    // 没有提供令牌或格式不正确
    res.sendStatus(401);
  }
};
exports.generateToken = generateToken;
exports.validateToken = validateToken;
