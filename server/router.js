function route(handle, query, request, response) {
  const { callback } = query
  console.log("About to route a request for "+ callback);
  if(typeof handle[callback] === 'function') {
    handle[callback](request, response, query);
  } 
}

exports.route = route