//改变主题色
const redBtn = document.querySelector("#redBtn");
const blueBtn = document.querySelector("#blueBtn");
const YellowBtn = document.querySelector("#YellowBtn");
const greenBtn = document.querySelector("#greenBtn");
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

//侧边栏点击active实现
document.querySelector("#menu").addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    let lis = document.querySelectorAll("#menu li");
    lis.forEach((li) => {
      li.classList.remove("menu_item_active_color");
    });
    event.target.classList.add("menu_item_active_color");
    navigateTo(event.target.getAttribute("data-path"));
  }
});
