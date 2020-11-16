const addURLParams = require('./addURLParam')

const jsonp = ({ url, params, callbackName }) => {
  // 组合参数获取 url
  const generateURL = () => {
    return addURLParams(url, params) + `&callback=${callbackName}`;
  };
  return new Promise((resolve, reject) => {
    callbackName = callbackName || "cb" + Math.random().toString().replace(".", "");
    let scriptEle = document.createElement('script');
    scriptEle.src = generateURL();
    document.body.appendChild(scriptEle);

    // 绑定到 window 上，为了后面调用
    window[callbackName] = data => {
      resolve(data);
      // script 执行完了，成为无用元素，需要清除
      document.body.removeChild(scriptEle);
    }
  })
}

module.exports = jsonp