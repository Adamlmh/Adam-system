//发请求得到个人信息（用于评论）
let commenterId;
let avatar2;
customFetch(
  `http://localhost:8080/api/private/Personalcenter/${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  commenterId = data.userId;
  avatar2 = data.avatar;
});

//发请求渲染个人信息
const RenderPersonal = (uploaderId) => {
  customFetch(
    `http://localhost:8080/api/private/Personalcenter/${uploaderId}`
  ).then((data) => {
    $.get("#group").innerText = data.group;
    $.get("#name").innerText = data.name;
    $.get("#avatar2").style.backgroundImage = `url('${avatar2}')`;
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
  ++n;
  renderComment();
  return renderPage(n);
});
// 渲染上一页;
$.get("#prePage").addEventListener("click", () => {
  n = n > 0 ? --n : n;
  renderComment();
  return renderPage(n);
});

//评论逻辑
//提交数据
let parentCommentId = 0;
$.get("#Enter").addEventListener("click", submitCommentDataForm);
function submitCommentDataForm() {
  const commentContent = $.get("#commentContentInput").value;
  customFetch(`http://localhost:8080/api/private/Comment/`, {
    method: "POST",
    body: JSON.stringify({
      commentContent,
      minutesId,
      commenterId,
      parentCommentId,
    }),
  })
    .then((data) => {
      alert(`${data.message}`);
      // 在这里处理后端返回的响应
      $.get("#commentContentInput").value = "";
      parentCommentId = 0;
    })
    .catch((error) => {
      console.error("发送数据至后端失败:", error);
      // 在这里处理错误情况
    });
}
//渲染评论
let getCommenterId;
let touxiang;
let Commentname;
let likeCount;
let commentTime;
let commentContent;
const renderComment = () => {
  customFetch(
    `http://localhost:8080/api/private/Comment/${parseInt(n) + 1}`
  ).then((data) => {
    console.log(data);
    $.get(".card_body_content_comment_contain").innerHTML = "";
    data.forEach((item, index) => {
      let getCommenterId = data[index].commenterId;
      let likeCount = data[index].likeCount;
      let commentTime = changeTime(data[index].updatedAt);
      let commentContent = data[index].commentContent;
      customFetch(
        `http://localhost:8080/api/private/Personalcenter/${parseInt(
          getCommenterId
        )}`
      ).then((userdata) => {
        Commentname = userdata.username;
        touxiang = userdata.avatar;

        $.get(
          ".card_body_content_comment_contain"
        ).innerHTML += `                  <div class="card_body_content_comment">
                    <div class="touxiangClass" style="background-image: url(${touxiang});" ></div>
                    <div class="message_content">
                      <div class="message_content_header">
                        <span class="card_body_content_function_right">
                          <h5 style="margin-right: 10px;">${Commentname}</h5>
                          <span style="margin-right: 5px;">❤</span>
                      <span id="likeCount">${likeCount}</span>
                        </span>

                        <span>
                          <span class="iconfont icon-pinglun"></span>
                          <span id="commentTime">${commentTime}</span>
                        </span>
                      </div>
                      <span class="message_content_header_span" id="commentContent">${commentContent}</span>
                    </div>
                  </div>`;
      });
    });
  });
};
renderComment();
