//发请求渲染上页面
customFetch(
  `http://localhost:8080/api/private/Personalcenter/${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  $.get("#group").innerText = data.group;
  $.get("#name").innerText = data.name;
  $.get(".avatar").style.backgroundImage = `url('${data.avatar}')`;
});

//渲染中间页面
customFetch(
  `http://localhost:8080/api/private/MeetingMinutes/getAllData${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  renderTable(data, propertiesMeeting, 1);
});

//渲染下面页面
customFetch(
  `http://localhost:8080/api/private/Feedback/getAllData${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  renderTable(data, propertiesFeetback, 2);
});
// 要在表格中显示的属性
let propertiesMeeting = [
  "minutesId",
  "uploaderName",
  "meetingTime",
  "meetingTopic",
  "meetingType",
  "tag1",
  "tag2",
  "tag3",
  "status",
];
let propertiesFeetback = [
  "feedbackId",
  "commenterName",
  "updatedAt",
  "feedbackSubject",
  "feedbackType",
  "commenterGroup",
  "status",
];
// 动态渲染表格行的函数
function renderTable(rowData, properties, n) {
  if (n === 1) {
    var tableBody = $.get("#table_tbody_meeting");
  } else {
    var tableBody = $.get("#table_tbody_feetback");
  }

  // 清空现有的表格行
  tableBody.innerHTML = "";

  // 遍历数据并创建表格行
  rowData.forEach(function (item) {
    var row = document.createElement("tr");

    // 遍历属性并创建相应的表格单元格
    properties.forEach(function (prop) {
      if (prop === "updatedAt") {
        item[prop] = changeTime(item[prop]);
      }
      var cell = document.createElement("td");
      cell.className = "table_cell";
      cell.textContent = item[prop];
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

// 接收到消时触发
socket.addEventListener("message", function (event) {
  alert(`${event.data}`);
  console.log("从服务器接收到消息:", event.data);
});
