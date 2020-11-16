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