//发请求渲染页面
function render() {
  customFetch(
    `http://localhost:8080/api/private/Personalcenter/${localStorage.getItem(
      "id"
    )}`
  ).then((data) => {
    $.get("#uploaderId").value = data.userId;
    $.get("#uploaderGroup").value = data.group;
    $.get("#uploaderName").value = data.username;
  });
}
render();

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
let personalminutes;

let PersonalMinutes = $.get("#personalMinutes");
PersonalMinutes.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file.type !== "text/plain") {
    PersonalMinutes.nextElementSibling.style.display = "block";
    PersonalMinutes.parentNode.classList.add("red");
    contentDataBtn.disabled = true;
    event.preventDefault(); // 阻止默认行为（即取消文件上传）
    return;
  } else {
    PersonalMinutes.nextElementSibling.style.display = "none";
    PersonalMinutes.parentNode.classList.remove("red");
    contentDataBtn.disabled = false;
    const reader = new FileReader();
    reader.onload = function (event) {
      personalminutes = event.target.result;
    };
    reader.readAsText(file);
  }
});
let formData = {};
//会议纪要提交
const contentDataBtn = $.get("#contentDataBtn");
contentDataBtn.addEventListener("click", submitForm);
function submitForm() {
  formData = getFormData(formData);
  formData["personalMinutes"] = personalminutes;
  console.log(formData);
  // 发送数据到后端或进行其他操作;
  // customFetch(`http://localhost:8080/api/private/MeetingMinutes`, {
  //   method: "POST",
  //   body: JSON.stringify(formData),
  // })
  //   .then((data) => {
  //     alert(`${data.message}`);
  //     // 清空表单中文本类型输入框的值
  //     clearTextInputs();
  //     render();
  //   })
  //   .catch((error) => {
  //     console.error("发送数据至后端失败:", error);
  //     // 在这里处理错误情况
  //   });
  alert("请继续完成图片上传后才正式提交到数据库");
}

//日期输入检测
const meetingTime = $.get("#meetingTime");
meetingTime.addEventListener("blur", function () {
  // 定义日期格式的正则表达式
  var datePattern = /^\d{4}\/(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12][0-9]|3[01])$/;

  // 使用正则表达式进行匹配
  if (datePattern.test(meetingTime.value)) {
    meetingTime.nextElementSibling.style.display = "none";
    meetingTime.parentNode.classList.remove("red");
    contentDataBtn.disabled = false;
  } else {
    meetingTime.nextElementSibling.style.display = "block";
    meetingTime.parentNode.classList.add("red");
    contentDataBtn.disabled = true;
  }
});

//会议图片提交
// 添加提交事件监听器
$.get("#photoform").addEventListener("submit", function (event) {
  event.preventDefault(); // 阻止表单默认提交行为

  const FOrmData = new FormData($.get("#photoform")); // 创建 FormData 对象并将表单元素传递给它

  // 发送 FormData 对象到服务器
  fetch("http://localhost:8080/upload", {
    method: "POST",
    body: FOrmData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      // let avatar = data.message;
      formData.meetingPhoto = `../../${data.message}`;
      console.log(formData);
      //发送数据到后端或进行其他操作;
      customFetch(`http://localhost:8080/api/private/MeetingMinutes`, {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then((data) => {
          alert(`${data.message}`);
          // 清空表单中文本类型输入框的值
          clearTextInputs();
          render();
        })
        .catch((error) => {
          console.error("发送数据至后端失败:", error);
          // 在这里处理错误情况
        });
    })
    .catch((error) => {
      console.error("上传出错：", error);
    });
});
