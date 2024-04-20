// 点击隐藏的文件上传输入框  处理上传头像内容
const inputFire = $.get('input[type="file"]');
function triggerFileInput() {
  inputFire.click();
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
inputFire.addEventListener("change", handleFileSelect);
//上传头像
// $.get("#avatarDataBtn").addEventListener("click", submitFileSelect);
// function submitFileSelect(event) {
//   const file = inputFire.files[0]; // 获取上传的文件
//   const formData = new FormData();
//   formData.append("file", file);

//   customFetch(`http://localhost:8080/api/upload`, {
//     method: "POST",
//     body: formData,
//   })
//     .then((data) => {
//       alert(`${data.message}`);
//     })
//     .catch((error) => {
//       console.error("上传出错：", error);
//     });
// }

//提交基础数据
document
  .querySelector("#basicDataBtn")
  .addEventListener("click", submitBasicDataForm);
function submitBasicDataForm() {
  const name = $.get("#name").value;
  const email = $.get("#email").value;
  const grade = $.get("#grade").value;
  const major = $.get("#major").value;
  const group = $.get("#group").value;
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
document
  .querySelector("#introductionBtn")
  .addEventListener("click", submitProfileForm);
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
document
  .querySelector("#passwordBtn")
  .addEventListener("click", submitpasswordForm);
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
      location.href = "../login/index.html";
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
