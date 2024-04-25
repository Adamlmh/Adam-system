//发请求渲染页面
function render() {
  customFetch(
    `http://localhost:8080/api/private/Personalcenter/${localStorage.getItem(
      "id"
    )}`
  ).then((data) => {
    console.log(data);
    $.get("#submitterId").value = data.userId;
    $.get("#commenterGroup").value = data.group;
    $.get("#commenterName").value = data.username;
  });
}
render();
//意见提交
const contentDataBtn = $.get("#contentDataBtn");
contentDataBtn.addEventListener("click", submitForm);
function submitForm() {
  var formData = getFormData();
  console.log(formData);
  // 检查是否有空值
  var isEmpty = Object.values(formData).some((value) => value === "");
  if (isEmpty) {
    root.style.setProperty("--alert-color", "#00a76f"); // 修改为红色
    alert("请填写所有字段");
    root.style.setProperty("--alert-color", "#FADAD8"); // 修改为绿色
    return; // 如果有任何字段为空，则不执行后续逻辑
  }
  // 发送数据到后端或进行其他操作
  customFetch(`http://localhost:8080/api/private/Feedback`, {
    method: "POST",
    body: JSON.stringify(formData),
  })
    .then((data) => {
      alert(`${data.message}`);
      // 清空表单中文本类型输入框的值
      clearTextInputs();
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch((error) => {
      console.error("发送数据至后端失败:", error);
      // 在这里处理错误情况
    });
}
//渲染上面页面
customFetch(
  `http://localhost:8080/api/private/Feedback/${localStorage.getItem("id")}`
).then((data) => {
  renderTable(data);
});

// 要在表格中显示的属性
let properties = [
  "feedbackId",
  "feedbackSubject",
  "updatedAt",
  "status",
  "processingComments",
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
      if (prop === "updatedAt") {
        item[prop] = changeTime(item[prop]);
      }
      cell.textContent = item[prop];
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}
