//发请求渲染个人信息

const RenderPersonal = (uploaderId) => {
  customFetch(
    `http://localhost:8080/api/private/Personalcenter/${uploaderId}`
  ).then((data) => {
    $.get("#group").innerText = data.group;
    $.get("#name").innerText = data.name;
    $.get("#avatar2").style.backgroundImage = `url('${data.avatar}')`;
    $.get("#avatar").style.backgroundImage = `url('${data.avatar}')`;
  });
};
//管理一个变量来记录目前拿到的数据第几条
let n = 0;
//按需加载  健壮性
const renderPage = (n) => {
  customFetch(
    `http://localhost:8080/api/private/MeetingMinutes/getMeetingData/${
      parseInt(n) + 1
    }`
  ).then((data) => {
    console.log(data);
    // 遍历图片元素并修改src属性
    renderMeeting(data[0]);
  });
};
renderPage(0);
let likes = 3;
let minutesId;
//传入data[n]
const renderMeeting = (data) => {
  const uploaderId = data.uploaderId;
  minutesId = data.minutesId;
  console.log(minutesId);
  //渲染个人信息
  RenderPersonal(uploaderId);
  $.get("#meetingTopic").innerText = data.meetingTopic;
  $.get("#personalMinutes").innerText = data.personalMinutes;
  $.get("#meetingContent").innerText = data.meetingContent;
  $.get("#likes").innerText = likes = data.likes;
  $.get("#meetingTopic").innerText = data.meetingTopic;
  $.get("#meetingPhoto").style.backgroundImage = `url('${data.meetingPhoto}')`;
  $.get("#commitTime").innerText = changeTime(data.updatedAt);
  $.get("#meetingTime").innerText = data.meetingTime;
};
//个人纪要展示
$.get(".personalMinute").addEventListener("click", () => {
  if ($.get("#personalMinutes").style.display === "none") {
    $.get("#personalMinutes").style.display = "block";
  } else {
    $.get("#personalMinutes").style.display = "none";
  }
});

//点赞功能
//添加节流功能
function throttle(func, delay) {
  let lastClickTime = 0;
  return function () {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime >= delay) {
      func.apply(this, arguments);
      lastClickTime = currentTime;
    }
  };
}
const likeClickHandler = function () {
  if ($.get("#likes").innerText == likes) {
    $.get("#likes").innerText = likes + 1;
    $.get("#dianzan").style.color = "rgb(245, 106, 0)";
  } else {
    $.get("#likes").innerText = likes;
    $.get("#dianzan").style.color = "black";
  }
  customFetch(
    `http://localhost:8080/api/private/MeetingMinutes/updata${minutesId}`,
    {
      method: "POST",
      body: JSON.stringify({ likes: $.get("#likes").innerText }),
    }
  )
    .then((data) => {
      alert(`${data.message}`);
    })
    .catch((error) => {
      console.error("发送数据至后端失败:", error);
      // 在这里处理错误情况
    });
};
const throttledLikeClickHandler = throttle(likeClickHandler, 2000);
$.get("#likes").addEventListener("click", throttledLikeClickHandler);
// 渲染下一页;
$.get("#nextPage").addEventListener("click", () => {
  return renderPage(++n);
});
// 渲染上一页;
$.get("#prePage").addEventListener("click", () => {
  return renderPage((n = n > 0 ? --n : n));
});

//评论逻辑
