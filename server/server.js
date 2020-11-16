const http = require("http")
const queryString = require("querystring")

function start(route, handle) {
  function onRequest(req, res) {
    console.log(req.url);
    const url = req.url;
    // 获取参数
    const query = queryString.parse(url.split("?")[1])
    console.log("Start handle something.");
    route(handle, query, req, res);
  }
  http.createServer(onRequest).listen(8000);
  console.log("Server has started.");
}

exports.start = start