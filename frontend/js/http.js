//封装fetch函数 公共获取
function customFetch(url, options = {}) {
  // 默认配置项
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    credentials: "same-origin",
    responseType: "json",
  };

  // 合并默认配置项和传入的选项
  const requestOptions = {
    ...defaultOptions,
    ...options,
  };

  // 处理请求参数
  let requestUrl = url;
  if (requestOptions.params) {
    const params = new URLSearchParams(requestOptions.params);
    requestUrl += "?" + params.toString();
  }

  // 发起请求
  return fetch(requestUrl, requestOptions)
    .then((response) => {
      // 检查请求是否成功
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // 处理JSON响应
      if (requestOptions.responseType === "json") {
        return response.json();
      }
      // 其他响应类型处理
      return response;
    })
    .catch((error) => {
      // 处理错误
      console.error("Fetch error:", error);
      throw error;
    });
}
