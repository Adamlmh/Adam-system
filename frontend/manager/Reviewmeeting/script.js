//管理一个n来看是需要哪个意见
let n = 1;
let dataAll;
// 定义一个全局变量，用于保存单元格的值
let cellValue = "";
//渲染上面页面
customFetch(
  `http://localhost:8080/api/private/MeetingMinutes/getAllData${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  dataAll = data;
  renderTable(data, propertiesFeetback, "status", "通过", 1);
});

// 要在表格中显示的属性
let propertiesFeetback = [
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
// 动态渲染表格行的函数
// 动态渲染表格行的函数
function renderTable(rowData, properties, pro, condition, n) {
  var tableBody = $.get("#table_tbody_meeting");
  // 清空现有的表格行
  tableBody.innerHTML = "";
  // 遍历数据并创建表格行
  rowData.forEach(function (item) {
    console.log(item[pro]);
    if (n || item[pro].toLowerCase().includes(condition.toLowerCase())) {
      var row = document.createElement("tr");
      // 遍历属性并创建相应的表格单元格
      properties.forEach(function (prop) {
        if (prop === "updatedAt") {
          item[prop] = changeTime(item[prop]);
        }
        var cell = document.createElement("td");
        if (prop === "minutesId") {
          cell.style.cursor = "pointer";
        }
        cell.className = "table_cell";
        cell.textContent = item[prop];
        row.appendChild(cell);
      });
      tableBody.appendChild(row);
    }
  });

  // 在表格渲染完成后添加点击事件监听器
  var firstColumnCells = document.querySelectorAll(
    "#table_tbody_meeting tr > td:first-child"
  );
  firstColumnCells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      n = cell.textContent;
      renderMeeting(n);
      // 获取当前单元格的文本内容，并保存在全局变量中
      cellValue = cell.textContent;
    });
  });
}

//实现任意搜索查询数据
$.get("#find").addEventListener("click", () => {
  let sign = 0;
  let pro = $.get("#pro").value.trim();
  let condition = $.get("#condition").value.trim();
  if (pro === "纪要ID") {
    pro = "minutesId";
    condition = parseInt(condition);
  }
  if (pro === "提交者") {
    pro = "uploaderName";
  }
  if (pro === "会议时间") {
    pro = "meetingTime";
  }
  if (pro === "会议主题") {
    pro = "meetingTopic";
  }
  if (pro === "会议类型") {
    pro = "meetingType";
  }
  if (pro === "标签1") {
    pro = "tag1";
  }
  if (pro === "标签2") {
    pro = "tag2";
  }
  if (pro === "标签3") {
    pro = "tag3";
  }
  if (pro === "审核状态") {
    pro = "status";
  }
  if (pro === "全部" || condition === "全部") {
    sign = 1;
  }
  console.log(pro, condition, sign);
  return renderTable(dataAll, propertiesFeetback, pro, condition, sign);
});

//渲染下页面
const renderMeeting = (n) => {
  console.log(typeof n);
  customFetch(
    `http://localhost:8080/api/private/MeetingMinutes/getMeetingData/${n}`
  )
    .then((data) => {
      console.log(data[0]);
      $.get("#uploaderName").value = data[0].uploaderName;
      $.get("#uploaderGroup").value = data[0].uploaderGroup;
      $.get("#meetingTopic").value = data[0].meetingTopic;
      $.get("#meetingTime").value = data[0].meetingTime;
      $.get("#tag1").value = data[0].tag1;
      $.get("#tag2").value = data[0].tag2;
      $.get("#tag3").value = data[0].tag3;
      $.get("#meetingContent").value = data[0].meetingContent;
      $.get("#personalMinutes").value = data[0].personalMinutes;
      $.get("#reviewComments").value = data[0].reviewComments;
      $.get("#status").value = data[0].status;
      $.get("#meetingType").value = data[0].meetingType;
      $.get(
        ".meetingPhoto"
      ).style.backgroundImage = `url('${data[0].meetingPhoto}')`;
    })
    .catch((error) => {
      console.error("发送数据至后端失败:", error);
      // 在这里处理错误情况
    });
};

//审核结果提交
const passDataBtn = $.get("#passDataBtn");
passDataBtn.addEventListener("click", () => {
  return submitForm(cellValue, "通过");
});
const NOpassDataBtn = $.get("#NOpassDataBtn");
NOpassDataBtn.addEventListener("click", () => {
  submitForm(cellValue, "不通过");
});

function submitForm(n, status) {
  const reviewComments = $.get("#reviewComments").value;
  n = parseInt(n);
  // 发送数据到后端或进行其他操作
  customFetch(`http://localhost:8080/api/private/MeetingMinutes/updata${n}`, {
    method: "POST",
    body: JSON.stringify({ reviewComments, status }),
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
//实现删除纪要功能deleteDataBtn
const deleteDataBtn = $.get("#deleteDataBtn");
deleteDataBtn.addEventListener("click", () => {
  n = parseInt(cellValue);
  customFetch(
    `http://localhost:8080/api/private/MeetingMinutes/delete${n}`
  ).then((data) => {
    alert(`${data.message}`);
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
  //同时删除对应的评论
  customFetch(`http://localhost:8080/api/private/Comment/delete${n}`).then(
    (data) => {
      alert(`${data.message}`);
    }
  );
});
//实现点击决定是否展示个人纪要
$.get("#personalMinuteLabel").addEventListener("click", () => {
  if ($.get("#personalMinutes").style.display === "none") {
    $.get("#personalMinutes").style.display = "block";
  } else {
    $.get("#personalMinutes").style.display = "none";
  }
});
// 接收到消时触发
socket.addEventListener("message", function (event) {
  alert(`${event.data}`);
});
