//发请求渲染页面
customFetch(
  `http://localhost:8080/api/private/Personalcenter/${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  $.get("#group").innerText = data.group;
  $.get("#name").innerText = data.name;
  $.get("#major").innerText = data.major;
  $.get("#grade").innerText = data.grade;
  $.get("#email").innerText = data.email;
  $.get("#introduction").innerText = data.introduction;
});

//处理头像数据
