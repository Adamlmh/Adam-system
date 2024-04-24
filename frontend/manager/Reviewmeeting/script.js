//管理一个n来看是需要哪个意见
let n = 1;
//渲染上面页面
customFetch(
  `http://localhost:8080/api/private/MeetingMinutes/getAllData${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  renderTable(data, propertiesFeetback, "status", "通过", 1);
  // 在表格渲染完成后添加点击事件监听器(实现点击哪个拿到哪个数据)
  var firstColumnCells = document.querySelectorAll(
    "#table_tbody_meeting tr > td:first-child"
  );
  firstColumnCells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      n = cell.textContent;
      renderMeeting(n);
    });
  });
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
function renderTable(rowData, properties, pro, condition, n) {
  var tableBody = $.get("#table_tbody_meeting");
  // 清空现有的表格行
  tableBody.innerHTML = "";
  // 遍历数据并创建表格行
  rowData.forEach(function (item) {
    console.log(item[pro]);
    if (item[pro] === condition || n) {
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
}

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
renderMeeting(1);
//审核结果提交
const passDataBtn = $.get("#passDataBtn");
passDataBtn.addEventListener("click", () => {
  let value = n;
  return submitForm(value, "通过");
});
const NOpassDataBtn = $.get("#NOpassDataBtn");
NOpassDataBtn.addEventListener("click", () => {
  let value = n;
  return submitForm(value, "不通过");
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
  customFetch(
    `http://localhost:8080/api/private/MeetingMinutes/delete${n}`
  ).then((data) => {
    alert(`${data.message}`);
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
});
// //实现点击审核状态 筛选待审核的
// $.get("#ApprovalStatus").addEventListener("click", () => {
//   console.log(1);
//   return getfeedbackStatus();
// });
// const getfeedbackStatus = () => {
//   customFetch(
//     `http://localhost:8080/api/private/Feedback/getfeedbackStatus`
//   ).then((data) => {
//     renderTable(data, propertiesFeetback);
//     // 在表格渲染完成后添加点击事件监听器(实现点击哪个拿到哪个数据)
//     var firstColumnCells = document.querySelectorAll(
//       "#table_tbody_feetback tr > td:first-child"
//     );
//     firstColumnCells.forEach(function (cell) {
//       cell.addEventListener("click", function () {
//         n = cell.textContent;
//         renderFeetback(n);
//       });
//     });
//   });
// };
//实现点击决定是否展示个人纪要
$.get("#personalMinuteLabel").addEventListener("click", () => {
  if ($.get("#personalMinutes").style.display === "none") {
    $.get("#personalMinutes").style.display = "block";
  } else {
    $.get("#personalMinutes").style.display = "none";
  }
});
