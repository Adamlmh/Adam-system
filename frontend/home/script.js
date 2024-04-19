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
