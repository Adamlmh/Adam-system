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
$.get("#avatarDataBtn").addEventListener("click", submitFileSelect);
function submitFileSelect(event) {
  const file = inputFire.files[0]; // 获取上传的文件
  const formData = new FormData();
  formData.append("file", file);

  customFetch(`http://localhost:8080/api/upload`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      alert(`${data.message}`);
    })
    .catch((error) => {
      console.error("上传出错：", error);
    });
}

//提交基础数据
document.querySelector("#basicDataBtn").addEventListener("click", submitForm);
function submitForm() {
  var formData = new FormData(document.querySelector("#basicData")); // 使用 FormData 对象收集表单数据
  console.log(formData);
  customFetch(
    `http://localhost:8080/api/private/Modifyinformation/${localStorage.getItem(
      "id"
    )}`,
    {
      method: "POST",
      body: JSON.stringify({
        mail: "123",
      }),
    }
  )
    .then((data) => {
      console.log(data);
      console.log("成功发送数据至后端");
      // 在这里处理后端返回的响应
    })
    .catch((error) => {
      console.error("发送数据至后端失败:", error);
      // 在这里处理错误情况
    });
}
