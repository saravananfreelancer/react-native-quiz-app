
var config = require("../config/index.js");
var ajax ={};

ajax.post = function(url,data,callback){
	console.log(url,data,callback)
	var request = new XMLHttpRequest();
	request.onreadystatechange = (e) => {
	  if (request.readyState !== 4) {
		return;
	  }

	  if (request.status === 200) {
		//console.log('success', request.responseText);
		var formatJson = JSON.parse(request.responseText);
		callback(formatJson);
	  } else {
		console.warn('error',request.responseText);
	  }
	};
	
	request.open('POST',config.serverURL + url);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify(data));
}

ajax.get = function(url,callback){
	//console.log("dsfsdfsd");
	var request = new XMLHttpRequest();
	request.onreadystatechange = (e) => {
	  if (request.readyState !== 4) {
		return;
	  }

	  if (request.status === 200) {
		//console.log('success', request.responseText);
		var formatJson = JSON.parse(request.responseText);
		callback(formatJson);
	  } else {
		console.warn('error',request.responseText);
	  }
	};
	
	request.open('GET',config.serverURL +url);
	//request.setRequestHeader('Content-Type', 'application/json');
	request.send();
}

module.exports = ajax;