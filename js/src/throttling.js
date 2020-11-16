// 节流
function throttle(fn, delay) {
  // 记录上一次函数触发的时间
  let lastTime = 0;
  return function() {
    // 记录当前函数触发的事件
    let nowTime = Date.now();
    if (nowTime - lastTime > delay) {
      fn.call(this);
      // 同步时间
      lastTime = nowTime;
    }
  }
}
document.onscroll = throttle(function() {
  console.log('scroll事件被触发了' + Date.now());
}, 200)