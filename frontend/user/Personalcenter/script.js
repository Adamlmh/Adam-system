//发请求渲染左边页面
customFetch(
  `http://localhost:8080/api/private/Personalcenter/${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  $.get("#group").innerText = data.group;
  $.get("#name").innerText = data.name;
  $.get("#major").innerText = data.major;
  $.get("#grade").innerText = data.grade;
  $.get("#email").innerText = data.email;
  $.get("#introduction").innerText = data.introduction;
});

//处理头像数据

//渲染右边页面
customFetch(
  `http://localhost:8080/api/private/MeetingMinutes/${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  renderTable(data);
});

// 要在表格中显示的属性
let properties = [
  "minutesId",
  "meetingTopic",
  "meetingTime",
  "status",
  "reviewComments",
];

// 动态渲染表格行的函数
function renderTable(rowData) {
  var tableBody = $.get(".table_tbody");

  // 清空现有的表格行
  tableBody.innerHTML = "";

  // 遍历数据并创建表格行
  rowData.forEach(function (item) {
    var row = document.createElement("tr");

    // 遍历属性并创建相应的表格单元格
    properties.forEach(function (prop) {
      var cell = document.createElement("td");
      cell.className = "table_cell";
      cell.textContent = item[prop];
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}
