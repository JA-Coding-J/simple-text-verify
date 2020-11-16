let reg = /^[0-9]/
function textVerify(request, response, query) {
  const { search, callback } = query
      // res.writeHead(200, { "Content-Type": "text/plain"});
    // res.write(result);
  let data = 'OK';
  if (reg.test(search.toString())) {
    data = "不能以数字开头！".toString();
  } else {
    data = 'OK'
  }
  response.end(`${callback}(${JSON.stringify(data)})`)
}

module.exports = {
  textVerify
}