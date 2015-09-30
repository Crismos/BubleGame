
var Config = function(callback) {
	var prefix = "::green::[Config]::white:: ";
	console.log("Loading config...",prefix);
	callback = callback || function(){};

	var fs = require('fs');
	var config = {};
	fs.readFile('./config.cfg', 'utf8', read);

	function keygen() {
		return Math.random().toString(36);
	}
	function read(err, data) {
		if (err) {
	    	return console.log(err,prefix);
		}
		var tmp = data.replace(/\r/g,"").split("\n");
		for(key in tmp) {
			if(tmp[key] != "")
				config[tmp[key].split(" = ")[0]] = tmp[key].split(" = ")[1];
		}
		console.log("Config loaded!",prefix);
		config["game.key"] = keygen();
		callback(config);
	}

	this.get = function(txt) {
		return config[txt];
	}
	this.getConfig = function() {
		return config;
	}
	
}

module.exports = Config;