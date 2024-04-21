//封装fetch函数 公共获取
//获得根节点
const root = document.documentElement;
function customFetch(url, options = {}) {
  // 默认配置项
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    responseType: "json",
  };

  // 合并默认配置项和传入的选项
  const requestOptions = {
    ...defaultOptions,
    ...options,
  };

  // 检查浏览器localStorage中是否存在token键值对，如果有，则设置Authorization头部
  const token = localStorage.getItem("token");
  if (token) {
    requestOptions.headers["Authorization"] = `Bearer ${token}`;
  }

  // 处理请求参数
  let requestUrl = url;
  if (requestOptions.params) {
    const params = new URLSearchParams(requestOptions.params);
    requestUrl += "?" + params.toString();
  }
  debugger;

  // 发起请求
  return fetch(requestUrl, requestOptions)
    .then((response) => {
      root.style.setProperty("--alert-color", "#00a76f"); // 修改为绿色
      // 检查请求是否成功
      if (!response.ok) {
        root.style.setProperty("--alert-color", "#FADAD8"); // 修改为红色
      }
      // 处理JSON响应
      if (requestOptions.responseType === "json") {
        return response.json();
      }
      // 其他响应类型处理
      return response;
    })
    .catch((error) => {
      root.style.setProperty("--alert-color", "#FADAD8"); // 修改为红色
      console.error("Fetch error:", error);
      throw error;
    });
}
