//发请求渲染页面
customFetch(
  `http://localhost:8080/api/private/Personalcenter/${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  $.get(".avatar img").src = data.avatar;
  $.get("#introduction").innerText = data.introduction;
});

//处理头像数据
