const verify = require("./verify")
const debounce = require("./debouncing")

const input = document.getElementById('input')
const p = document.getElementById('text_warn')
// 用 keyup是因为当按住 backspace时，只有当按键松开才执行
input.onkeyup = debounce(() => {
  // 发起文本验证请求
  verify.textVerify(input, p)
}, 200);