//管理一个n来看是需要哪个意见
let n = 1;
let dataAll;
// 定义一个全局变量，用于保存单元格的值
let cellValue = "";
//渲染上面页面
customFetch(
  `http://localhost:8080/api/private/MeetingMinutes/${localStorage.getItem(
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
      const image = document.createElement("img"); // 创建一个img元素
      image.src = data[0].meetingPhoto; // 设置img的src为上传的图片数据
      const addDiv = $.get(".add");
      addDiv.innerHTML = "";
      addDiv.appendChild(image);
    })
    .catch((error) => {
      console.error("发送数据至后端失败:", error);
      // 在这里处理错误情况
    });
};

//实现点击决定是否展示个人纪要
$.get("#personalMinuteLabel").addEventListener("click", () => {
  if ($.get("#personalMinutes").style.display === "none") {
    $.get("#personalMinutes").style.display = "block";
  } else {
    $.get("#personalMinutes").style.display = "none";
  }
});
// 点击隐藏的文件上传输入框  处理上传头像内容
const inputFire = $.get("#meetingPhoto");
function triggerFileInput() {
  inputFire.click();
}
$.get(".upload_span").addEventListener("click", triggerFileInput);
//预览文件
function handleFileSelect(event) {
  const file = event.target.files[0]; // 获取上传的文件
  const reader = new FileReader(); // 创建一个FileReader对象
  reader.onload = function (e) {
    const image = document.createElement("img"); // 创建一个img元素
    image.src = e.target.result; // 设置img的src为上传的图片数据
    const addDiv = $.get(".add");
    addDiv.innerHTML = "";
    addDiv.appendChild(image);
  };

  reader.readAsDataURL(file); // 将文件读取为Data URL
}
inputFire.addEventListener("change", handleFileSelect);
// 取传入tx文件
let personalminutes = "";

let PersonalMinutes = $.get(".PersonalMinutes");
PersonalMinutes.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file.type !== "text/plain") {
    PersonalMinutes.nextElementSibling.style.display = "block";
    PersonalMinutes.parentNode.classList.add("red");
    $.get("#photoDataBtn").disabled = true;
    $.get("#temporaryDataBtn").disabled = true;
    event.preventDefault(); // 阻止默认行为（即取消文件上传）
    return;
  } else {
    PersonalMinutes.nextElementSibling.style.display = "none";
    PersonalMinutes.parentNode.classList.remove("red");
    $.get("#photoDataBtn").disabled = false;
    $.get("#temporaryDataBtn").disabled = false;
    const reader = new FileReader();
    reader.onload = function (event) {
      personalminutes = event.target.result;
      // 检查字符长度是否小于 1000
      if (personalminutes.length < 1000) {
        PersonalMinutes.parentNode.classList.remove("red");
        $.get("#photoDataBtn").disabled = false;
        $.get("#temporaryDataBtn").disabled = false;
        // 字符长度小于 1000
        root.style.setProperty("--alert-color", "#00a76f"); // 修改为绿色
        alert("文件内容小于 1000 字符,符合要求");
      } else {
        // 字符长度大于等于 1000
        PersonalMinutes.parentNode.classList.add("red");
        $.get("#photoDataBtn").disabled = true;
        $.get("#temporaryDataBtn").disabled = true;
        root.style.setProperty("--alert-color", "#FADAD8"); // 修改为红色
        alert("文件内容大于等于 1000 字符");
      }
      setTimeout(() => {
        root.style.setProperty("--alert-color", "#00a76f"); // 修改为绿色
      }, 2000);
    };

    reader.readAsText(file);
  }
});
let formData = {};
//会议纪要提交
function submitForm() {
  //检测会议主题和会议内容是否未空
  const meetingTopic = $.get("#meetingTopic").value.trim();
  const meetingContent = $.get("#meetingContent").value.trim();
  const meetingTime = $.get("#meetingTime").value.trim();
  // 检查字段是否为空
  if (!meetingTopic || !meetingContent || !meetingTime) {
    root.style.setProperty("--alert-color", "#FADAD8"); // 修改为红色
    alert("请填写所有字段,标签选填");

    return 1; // 如果有任何字段为空，则不执行后续逻辑
  }
  root.style.setProperty("--alert-color", "#00a76f"); // 修改为绿色
  formData = getFormData(formData);
  if (personalminutes != "") {
    formData["personalMinutes"] = personalminutes;
  }
  console.log(personalminutes);
  return 0;
}
//暂存事件

$.get("#temporaryDataBtn").addEventListener("click", function () {
  pushForm(1);
});
//sign==>标志是否是暂存
const pushForm = (sign) => {
  if (submitForm()) {
    return;
  }
  if (sign) {
    formData.status = "暂存";
  } else {
    formData.status = "待审核";
  }
  console.log(formData);
  const fileInput = document.querySelector("#photoform input[type='file']");
  // 如果文件输入框的值为空字符串，则表示没有选择文件上传,直接发数据 不发送图片
  if (fileInput.value === "") {
    //发送数据到后端或进行其他操作;
    customFetch(
      `http://localhost:8080/api/private/MeetingMinutes/updata${cellValue}`,
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    )
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
  } else {
    // 如果选择了文件上传，则创建 FormData 对象并将表单元素传递给它
    const FOrmData = new FormData($.get("#photoform")); // 创建 FormData 对象并将表单元素传递给它
    // 发送 FormData 对象到服务器
    fetch("http://localhost:8080/upload", {
      method: "POST",
      body: FOrmData,
    })
      .then((response) => response.json())
      .then((data) => {
        // let avatar = data.message;
        formData.meetingPhoto = `../../${data.message}`;
        console.log(formData);
        //发送数据到后端或进行其他操作;
        customFetch(
          `http://localhost:8080/api/private/MeetingMinutes/updata${cellValue}`,
          {
            method: "POST",
            body: JSON.stringify(formData),
          }
        )
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
      })
      .catch((error) => {
        console.error("上传出错：", error);
      });
  }
};

//会议图片提交
// 添加提交事件监听器
$.get("#photoform").addEventListener("submit", function (event) {
  event.preventDefault(); // 阻止表单默认提交行为
  pushForm(0);
});
//日期输入检测
const meetingTime = $.get("#meetingTime");
meetingTime.addEventListener("blur", function () {
  // 定义日期格式的正则表达式
  var datePattern = /^\d{4}\/(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12][0-9]|3[01])$/;

  // 使用正则表达式进行匹配
  if (datePattern.test(meetingTime.value)) {
    meetingTime.nextElementSibling.style.display = "none";
    meetingTime.parentNode.classList.remove("red");
    $.get("#photoDataBtn").disabled = false;
    $.get("#temporaryDataBtn").disabled = false;
  } else {
    meetingTime.nextElementSibling.style.display = "block";
    meetingTime.parentNode.classList.add("red");
    $.get("#photoDataBtn").disabled = true;
    $.get("#temporaryDataBtn").disabled = false;
  }
});
