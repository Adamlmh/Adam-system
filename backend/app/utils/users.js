//token函数
const crypto = require('crypto');
//生成Token
//三个参数 分别是需要加密的数据 用于签名的密钥 过期时间
function generateToken(payload,secretKey,expiresIn){
  const header = Buffer.from(JSON.stringify({typ:'JWT',alg:'HS256'})).toString('base64');
  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto.createHmac('sha256',secretKey).update(`${header}.${payload}`).digest('base64');
  const expiresInSeconds = expiresIn ? expiresIn : 3600;
  const expiration = Math.floor(Date.now()/1000)+expiresInSeconds;
  return `${header}.${payloadEncoded}.${signature}.${expiration}`;
}
//验证Token
function verifyToken(token,secretKey){
  const[header,payloadBase64,signatureBase64,expiration]=token.split('.');
  const payload = JSON.parse(Buffer.from(payloadBase64,'base64').toString());
  const signature = crypto.createHmac('sha256',secretKey).update(`${header}.${payloadBase64}`).digest('base64');
     const currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp > parseInt(expiration) || signature !== signatureBase64) {
        return null; // Token 已过期或签名不匹配
    }
    return payload; // 返回解码后的 payload
}
module.exports = {generateToken,verifyToken};