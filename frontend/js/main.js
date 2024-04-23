//改变弹窗样式
function alert(content) {
  const alert = document.createElement("div");
  alert.className = "alert";
  alert.textContent = content;
  document.body.appendChild(alert);
  setTimeout(() => {
    document.body.removeChild(alert);
  }, 2000);
}
//检查是否有token（防止直接改路由黑进）
function verifyToken() {
  if (window.location.pathname !== "/login/index.html") {
    const token = localStorage.getItem("token");
    if (!token) {
      location.href = "/login/index.html";
    }
  }
  if (window.location.pathname.startsWith("/manager/")) {
    if (parseInt(localStorage.getItem("usertype")) !== 0) {
      location.href = "/login/index.html";
    }
  }
}
window.addEventListener("load", verifyToken);
//修改主题颜色
const redBtn = $.get("#redBtn");
const blueBtn = $.get("#blueBtn");
const YellowBtn = $.get("#YellowBtn");
const greenBtn = $.get("#greenBtn");
redBtn.addEventListener("click", () => {
  changePrimaryColor("#ff3030", "#fff2f0");
});
blueBtn.addEventListener("click", () => {
  changePrimaryColor("#078dee", "#e6f9ff");
});
YellowBtn.addEventListener("click", () => {
  changePrimaryColor("#fda92d", "#fffbf0");
});
greenBtn.addEventListener("click", () => {
  changePrimaryColor("#00a76f", "#cfe6da");
});
function changePrimaryColor(color, backgroundColor) {
  const root = document.documentElement;
  root.style.setProperty("--primary-color", color);
  root.style.setProperty("--background-color", backgroundColor);
}
//提交后清空输入框
// 清空表单中文本类型输入框的值
function clearTextInputs() {
  // 获取所有文本类型输入框
  var textInputs = document.querySelectorAll('input[type="text"]');
  // 遍历所有文本类型输入框，将值设为空字符串
  textInputs.forEach(function (input) {
    input.value = "";
  });
}
// 获取表单所有输入框的值
function getFormData() {
  var formData = {};

  // 获取文本输入框的值
  var textInputs = document.querySelectorAll('input[type="text"]');
  textInputs.forEach(function (input) {
    formData[input.id] = input.value;
  });

  // 获取单选框的值
  var radioInputs = document.querySelectorAll('input[type="radio"]:checked');
  radioInputs.forEach(function (input) {
    formData[input.name] = input.value;
  });
  // 获取textarea的值
  var textareas = document.querySelectorAll("textarea");
  textareas.forEach(function (textarea) {
    formData[textarea.id] = textarea.value;
  });
  return formData;
}

function changeTime(updatedAt) {
  // 手动解析时间戳字符串
  const parts = updatedAt.split(/[-T:.]/);
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const hour = parseInt(parts[3], 10);
  const minute = parseInt(parts[4], 10);
  const second = parseInt(parts[5], 10) || 0; // 处理没有秒的情况

  // 创建一个新的 Date 对象，注意不再使用 Date.UTC
  const date = new Date(year, month, day, hour, minute, second);

  // 将时间调整为东八区
  date.setHours(date.getHours() + 8);

  // 获取调整后的年、月、日、小时、分钟和秒
  const adjustedYear = date.getFullYear();
  const adjustedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const adjustedDay = date.getDate().toString().padStart(2, "0");
  const adjustedHour = date.getHours().toString().padStart(2, "0");
  const adjustedMinute = date.getMinutes().toString().padStart(2, "0");
  const adjustedSecond = date.getSeconds().toString().padStart(2, "0");

  // 格式化输出，包含秒
  const formattedDate = `${adjustedYear}-${adjustedMonth}-${adjustedDay}-${adjustedHour}:${adjustedMinute}:${adjustedSecond}`;
  return formattedDate;
  // 输出格式为：2024-04-22-12:10:32
}
