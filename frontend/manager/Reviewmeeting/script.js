//管理一个n来看是需要哪个意见
let n;
//渲染上面页面
customFetch(
  `http://localhost:8080/api/private/Feedback/getAllData${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  renderTable(data, propertiesFeetback);
  // 在表格渲染完成后添加点击事件监听器(实现点击哪个拿到哪个数据)
  var firstColumnCells = document.querySelectorAll(
    "#table_tbody_feetback tr > td:first-child"
  );
  firstColumnCells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      n = cell.textContent;
      renderFeetback(n);
    });
  });
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
      if (prop === "feedbackId") {
        cell.style.cursor = "pointer";
      }
      cell.className = "table_cell";
      cell.textContent = item[prop];
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

//渲染下页面
const renderFeetback = (n) => {
  customFetch(
    `http://localhost:8080/api/private/Feedback/getfeedbackIdData${n}`
  ).then((data) => {
    console.log(data);
    $.get("#submitterId").value = data.submitterId;
    $.get("#commenterName").value = data.commenterName;
    $.get("#commenterGroup").value = data.commenterGroup;
    $.get("#status").value = data.status;
    $.get("#feedbackSubject").value = data.feedbackSubject;
    $.get("#feedbackType").value = data.feedbackType;
    $.get("#feedbackContent").value = data.feedbackContent;
    $.get("#processingComments").value = data.processingComments;
  });
};
renderFeetback(1);
//意见提交
const contentDataBtnPass = $.get("#contentDataBtnPass");
contentDataBtnPass.addEventListener("click", () => {
  let value = n;
  return submitForm(value);
});
function submitForm(n) {
  const processingComments = $.get("#processingComments").value;
  const status = "已回复";
  n = parseInt(n);
  // 发送数据到后端或进行其他操作
  customFetch(`http://localhost:8080/api/private/Feedback/updata${n}`, {
    method: "POST",
    body: JSON.stringify({ processingComments, status }),
  })
    .then((data) => {
      alert(`${data.message}`);
      // 清空表单中文本类型输入框的值
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch((error) => {
      console.error("发送数据至后端失败:", error);
      // 在这里处理错误情况
    });
}
//实现点击审核状态 筛选未回复的
$.get("#ApprovalStatus").addEventListener("click", () => {
  console.log(1);
  return getfeedbackStatus();
});
const getfeedbackStatus = () => {
  customFetch(
    `http://localhost:8080/api/private/Feedback/getfeedbackStatus`
  ).then((data) => {
    renderTable(data, propertiesFeetback);
    // 在表格渲染完成后添加点击事件监听器(实现点击哪个拿到哪个数据)
    var firstColumnCells = document.querySelectorAll(
      "#table_tbody_feetback tr > td:first-child"
    );
    firstColumnCells.forEach(function (cell) {
      cell.addEventListener("click", function () {
        n = cell.textContent;
        renderFeetback(n);
      });
    });
  });
};
