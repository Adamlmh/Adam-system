//渲染上面页面
customFetch(
  `http://localhost:8080/api/private/Feedback/getAllData${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  // renderTable(data, propertiesFeetback);
});
// 要在表格中显示的属性
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
function renderTable(rowData, properties) {
  var tableBody = $.get("#table_tbody_feetback");
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
//渲染下页面
customFetch(
  `http://localhost:8080/api/private/Feedback/getfeedbackIdData1`
).then((data) => {
  console.log(data);
  $.get("#submitterId").value = data.submitterId;
  $.get("#commenterName").value = data.commenterName;
  $.get("#commenterGroup").value = data.commenterGroup;
  $.get("#status").value = data.status;
  $.get("#feedbackSubject").value = data.feedbackSubject;
  $.get("#feedbackType").value = data.feedbackType;
  $.get("#feedbackContent").value = data.feedbackContent;
  //   commenterName;
  //   commenterGroup;
  // status;
  // feedbackSubject;
  // feedbackType;
  // feedbackContent;
});
