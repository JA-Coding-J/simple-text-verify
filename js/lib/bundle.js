(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * 
 * @param {string} url 
 * @param {object} map 
 */
function addURLParam(url, map) {
  for (let key in map) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(key) + "=" + encodeURIComponent(map[key]);
  }
  return url;
}

module.exports = addURLParam
},{}],2:[function(require,module,exports){
const verify = require("./verify")
const debounce = require("./debouncing")

const input = document.getElementById('input')
const p = document.getElementById('text_warn')
// 用 keyup是因为当按住 backspace时，只有当按键松开才执行
input.onkeyup = debounce(() => {
  // 发起文本验证请求
  verify.textVerify(input, p)
}, 200);
},{"./debouncing":3,"./verify":5}],3:[function(require,module,exports){
// 防抖
// 延迟防抖
function debounce(fn, delay) {
  // 记录上一次触发的延时器
  let timer;
  const args = arguments;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(this,args)
    },delay)
  }
}

module.exports = debounce
},{}],4:[function(require,module,exports){
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
},{"./addURLParam":1}],5:[function(require,module,exports){
const jsonp = require('./jsonp')

function textVerify(ele, p) {
  const text = ele.value;
  let info = 'empty';

  let url = "http://127.0.0.1:8000/";
  // 发起 jsonp 请求
  jsonp({
    url: url,
    params: {
      search: text
    },
    callbackName: "textVerify"
  }).then(data => {
      // 返回相同数据不做操作，减少对 dom 的操作
      console.log(data);
      if (data != info) {
        info = data;
        p.textContent = info.toString();
      }
    }).catch(err => {
      console.log(err);
    })

}

exports.textVerify = textVerify
},{"./jsonp":4}]},{},[2]);
