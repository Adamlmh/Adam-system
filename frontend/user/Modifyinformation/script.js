// 点击隐藏的文件上传输入框  处理上传头像内容
const inputFile = $.get('input[type="file"]');
function triggerFileInput() {
  inputFile.click();
}
document
  .querySelector(".upload_span")
  .addEventListener("click", triggerFileInput);
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
inputFile.addEventListener("change", handleFileSelect);
// 上传头像(base64格式无法实现高清图片上传);
// $.get("#avatarDataBtn").addEventListener("click", submitFileSelect);
// function submitFileSelect(event) {
//   const file = inputFile.files[0]; // 获取上传的文件

//   const reader = new FileReader();

//   reader.onload = function (event) {
//     const avatar = event.target.result; // 获取 base64 格式的数据部分
//     customFetch(
//       `http://localhost:8080/api/private/Modifyinformation/${localStorage.getItem(
//         "id"
//       )}`,
//       {
//         method: "POST",
//         body: JSON.stringify({ avatar }),
//       }
//     )
//       .then((data) => {
//         alert(`${data.message}`);
//       })
//       .catch((error) => {
//         console.error("上传出错：", error);
//       });
//   };

//   reader.readAsDataURL(file);
// }

// 保存文件实现
// $.get("#avatarDataBtn").addEventListener("click", submitFileSelect);

// function submitFileSelect(event) {
//   const file = inputFile.files[0]; // 获取上传的文件
//   const formData = new FormData();
//   formData.append("file", file); // 将文件添加到 FormData 对象中
//   // 发送 FormData 对象到服务器
//   customFetch(`http://localhost:8080/upload`, {
//     method: "POST",
//     body: formData, // 直接将 FormData 对象作为请求体
//   })
//     .then((data) => {
//       alert(`${data.message}`);
//     })
//     .catch((error) => {
//       console.error("上传出错：", error);
//     });
// }

// 获取表单元素
const form = document.querySelector("form");

// 添加提交事件监听器
form.addEventListener("submit", function (event) {
  event.preventDefault(); // 阻止表单默认提交行为

  const formData = new FormData(form); // 创建 FormData 对象并将表单元素传递给它

  // 发送 FormData 对象到服务器
  fetch("http://localhost:8080/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      // let avatar = data.message;
      const avatar = `../../${data.message}`;
      customFetch(
        `http://localhost:8080/api/private/Modifyinformation/${localStorage.getItem(
          "id"
        )}`,
        {
          method: "POST",
          body: JSON.stringify({
            avatar,
          }),
        }
      )
        .then((data) => {
          alert(`${data.message}`);
          // 在这里处理后端返回的响应
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

//提交基础数据
$.get("#basicDataBtn").addEventListener("click", submitBasicDataForm);
function submitBasicDataForm() {
  const name = $.get("#name").value.trim();
  const email = $.get("#email").value.trim();
  const grade = $.get("#grade").value.trim();
  const major = $.get("#major").value.trim();
  const group = $.get("#group").value.trim();

  // 检查字段是否为空
  if (!name || !email || !grade || !major || !group) {
    root.style.setProperty("--alert-color", "#00a76f"); // 修改为红色
    alert("请填写所有字段");
    root.style.setProperty("--alert-color", "#FADAD8"); // 修改为绿色
    return; // 如果有任何字段为空，则不执行后续逻辑
  }
  customFetch(
    `http://localhost:8080/api/private/Modifyinformation/${localStorage.getItem(
      "id"
    )}`,
    {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        grade,
        major,
        group,
      }),
    }
  )
    .then((data) => {
      alert(`${data.message}`);
      // 在这里处理后端返回的响应
    })
    .catch((error) => {
      console.error("发送数据至后端失败:", error);
      // 在这里处理错误情况
    });
}
//个人简介提交
$.get("#introductionBtn").addEventListener("click", submitProfileForm);
function submitProfileForm() {
  const introduction = $.get("#introduction").value;
  customFetch(
    `http://localhost:8080/api/private/Modifyinformation/${localStorage.getItem(
      "id"
    )}`,
    {
      method: "POST",
      body: JSON.stringify({
        introduction,
      }),
    }
  )
    .then((data) => {
      alert(`${data.message}`);
      // 在这里处理后端返回的响应
    })
    .catch((error) => {
      console.error("发送数据至后端失败:", error);
      // 在这里处理错误情况
    });
}
//修改密码提交
let oldpassword;
const oldPassword = $.get("#oldPassword");
const newPassword = $.get("#newPassword");
const REnewPassword = $.get("#REnewPassword");
const passwordBtn = $.get("#passwordBtn");
oldPassword.addEventListener("blur", function () {
  if (oldPassword.value !== oldpassword) {
    oldPassword.nextElementSibling.style.display = "block";
    oldPassword.parentNode.classList.add("red");
    passwordBtn.disabled = true;
  } else {
    oldPassword.nextElementSibling.style.display = "none";
    oldPassword.parentNode.classList.remove("red");
    passwordBtn.disabled = false;
  }
});

REnewPassword.addEventListener("blur", function () {
  if (newPassword.value !== REnewPassword.value) {
    REnewPassword.nextElementSibling.style.display = "block";
    REnewPassword.parentNode.classList.add("red");
    passwordBtn.disabled = true;
  } else {
    REnewPassword.nextElementSibling.style.display = "none";
    REnewPassword.parentNode.classList.remove("red");
    passwordBtn.disabled = false;
  }
});
$.get("#passwordBtn").addEventListener("click", submitpasswordForm);
function submitpasswordForm() {
  const password = $.get("#REnewPassword").value;
  customFetch(
    `http://localhost:8080/api/private/Modifyinformation/${localStorage.getItem(
      "id"
    )}`,
    {
      method: "POST",
      body: JSON.stringify({
        password,
      }),
    }
  )
    .then((data) => {
      alert(`${data.message}`);
      setTimeout(() => {
        location.href = "../../login/index.html";
      }, 1000);
      // 在这里处理后端返回的响应
    })
    .catch((error) => {
      console.error("发送数据至后端失败:", error);
      // 在这里处理错误情况
    });
}
//拿数据渲染
customFetch(
  `http://localhost:8080/api/private/Personalcenter/${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  oldpassword = data.password;
  $.get("#id").value = data.userId;
  $.get("#grade").value = data.grade;
  $.get("#username").value = data.username;
  $.get("#email").value = data.email;
  $.get("#major").value = data.major;
  $.get("#group").value = data.group;
  $.get("#name").value = data.name;
  $.get("#introduction").value = data.introduction;
});
