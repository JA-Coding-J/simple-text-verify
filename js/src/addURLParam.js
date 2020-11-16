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