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