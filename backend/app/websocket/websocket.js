const { Server: WebSocketServer, OPEN: WebSocketOPEN } = require("ws");
let wss;

function startWebSocketServer(server) {
  wss = new WebSocketServer({ server });

  wss.on("connection", function connection(ws) {
    console.log("WebSocket连接已建立。");

    ws.on("message", function incoming(message) {
      console.log("收到消息:", message);
      sendToAll("用户有新的会议纪要申请！");
    });

    ws.on("close", function close() {
      console.log("WebSocket连接已关闭。");
    });
  });
}

function sendToAll(message) {
  if (wss && wss.clients) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocketOPEN) {
        client.send(message);
      }
    });
  }
}

module.exports = startWebSocketServer;
