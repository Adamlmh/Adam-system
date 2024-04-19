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
      location.href = "../login/index.html";
    }
  }
  console.log(window.location.pathname);
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
