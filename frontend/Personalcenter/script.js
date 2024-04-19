const span =
  //发请求渲染页面
  customFetch(
    `http://localhost:8080/api/private/Personalcenter/${localStorage.getItem(
      "id"
    )}`
  ).then((data) => {
    console.log(data.introduction);
    $.get("#introduction").innerText = data.introduction;
  });
