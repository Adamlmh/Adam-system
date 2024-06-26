const render = function (data) {
  //自动下一个
  let timer = setInterval(get_next, 3000);
  //动态创建图片
  let sz = new Array();
  let szdiv = new Array();
  var cur_ul = document.getElementById("banner");
  for (let i = 1; i <= 5; i++) {
    var cur_li = document.createElement("li");
    var cur_img = document.createElement("img");

    cur_img.src = `${data[i - 1].meetingPhoto}`;
    cur_img.style.width = "400px";
    cur_img.style.height = "200px";
    cur_li.appendChild(cur_img);

    cur_li.onmouseenter = function () {
      clearInterval(timer);
    };
    cur_li.onmouseleave = function () {
      timer = setInterval(get_next, 3000);
    };

    if (i != 5) {
      cur_li.id = 5 - i;
    } else {
      cur_li.id = 5;
    }

    cur_ul.appendChild(cur_li);
    sz.push(cur_li);
    sz[sz.length - 1].style.left = "0px";

    let bottom_div = document.createElement("div");
    bottom_div.style.left = 125 * i + "px";
    bottom_div.name = i;
    szdiv.push(bottom_div);
    cur_ul.appendChild(bottom_div);
  }

  let pre_img = document.createElement("img");
  pre_img.src = "../../images/preImg.png";
  pre_img.style.position = "absolute";
  pre_img.style.left = 0;
  pre_img.style.top = 0;
  pre_img.style.bottom = 0;
  pre_img.style.margin = "auto";
  pre_img.style.zIndex = 100;
  cur_ul.appendChild(pre_img);

  let nex_img = document.createElement("img");
  nex_img.src = "../../images/nexImg.png";
  nex_img.style.position = "absolute";
  nex_img.style.right = 0;
  nex_img.style.top = 0;
  nex_img.style.bottom = 0;
  nex_img.style.margin = "auto";
  nex_img.style.zIndex = 100;
  cur_ul.appendChild(nex_img);

  pre_img.onclick = function () {
    clearInterval(timer);
    get_pre();
    timer = setInterval(get_next, 3000);
  };

  nex_img.onclick = function () {
    clearInterval(timer);
    get_next();
    timer = setInterval(get_next, 3000);
  };

  let len = sz.length - 1;
  sz[len - 2].style.left = "0px";
  sz[len - 1].style.zIndex = 100;
  sz[len - 1].style.left = "200px";
  sz[len - 1].style.transform = "scale(1.3)";
  sz[len].style.left = "400px";

  szdiv[0].style.background = "var(--primary-color)";

  for (let i = 0; i < szdiv.length; i++) {
    szdiv[i].onmouseenter = function () {
      clearInterval(timer);
      let len1 = sz[len - 1].id;
      let len2 = szdiv[i].name;
      let dis = Math.max(len1, len2) - Math.min(len1, len2);
      if (len1 > len2) {
        while (dis--) get_pre();
      } else {
        while (dis--) get_next();
      }
      timer = setInterval(get_next, 3000);
    };
  }
  //取出第一张插入到最后一张
  function get_pre() {
    let give_up = sz[0];
    sz.shift();
    sz.push(give_up);
    for (let i = 0; i < sz.length; i++) {
      sz[i].style.zIndex = i;
      sz[i].style.transform = "scale(1)";
    }
    sz[len - 2].style.left = "0px";
    sz[len - 1].style.zIndex = 100;
    sz[len - 1].style.left = "200px";
    sz[len - 1].style.transform = "scale(1.3)";
    sz[len - 1].style.opacity = 1;
    sz[len].style.left = "400px";

    sync_szdiv();
  }
  //pop最后一张 插入到第一张
  function get_next() {
    let give_up = sz[len];
    sz.pop();
    sz.unshift(give_up);
    for (let i = 0; i < sz.length; i++) {
      sz[i].style.zIndex = i;
      sz[i].style.transform = "scale(1)";
    }
    sz[len - 2].style.left = "0px";
    sz[len - 1].style.zIndex = 100;
    sz[len - 1].style.left = "200px";
    sz[len - 1].style.transform = "scale(1.3)";
    sz[len - 1].style.opacity = 1;
    sz[len].style.left = "400px";
    sync_szdiv();
  }

  function sync_szdiv() {
    for (let i = 0; i < szdiv.length; i++) {
      if (szdiv[i].name == sz[len - 1].id)
        szdiv[i].style.background = "var(--primary-color)";
      else szdiv[i].style.background = "white";
    }
  }
};

//拿最近五条数据
//渲染下面页面
customFetch(
  `http://localhost:8080/api/private/MeetingMinutes/getFiveData${localStorage.getItem(
    "id"
  )}`
).then((data) => {
  console.log(data);
  var images = document.querySelectorAll(".slide img");
  // 遍历图片元素并修改src属性
  images.forEach(function (img, index) {
    img.src = data[index].meetingPhoto;
  });
  render(data);
});
