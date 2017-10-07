var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var arrayFiles = [];

module.exports = (function() {

	var readFile = function(path) {
		return fs.readFileSync(path, 'utf8');
	}

	var writeFile = function(path, content, current, callback) {
		fs.writeFile(path, content, 'utf8', function(){
			callback(current);
		});
	}

	var getPaths = function(rootPath, extensionFilter, dateStart, dateEnd) {



		try {
			var files = fs.readdirSync(rootPath) || [];

			files.forEach(function(element){
				var currentPath = path.join(rootPath, element);
				var infoPath = fs.lstatSync(currentPath);

				if (infoPath.isDirectory()) {
					getPaths(currentPath, extensionFilter, dateStart, dateEnd);
				}

				if (currentPath.split('.').slice(-1)[0] === extensionFilter) {
					var filterDate = currentPath.split("/").slice(-3)[0];
					filterDate = new Date(filterDate.split('-').slice(0, 3).join(' '));
					if (filterDate.getTime() >= dateStart.getTime() && filterDate.getTime() <= dateEnd.getTime()) {
						arrayFiles.push(currentPath);
					}
				}
			});
			return arrayFiles;

		} catch(err) {
			console.log("Error getFiler:", err);
			return [];
		}
	}


	var replace = function(paths, templates) {

		var html;
		_.each(paths, function(path, index){
			html = readFile(path);
			_.each(templates, function(content, key){
				html = html.replace(key, content);
			});
			writeFile(path, html, index, function(current){
				console.log(current,'of',paths.length);
			});
		});
	}


	return {
		getPaths: getPaths,
		readFile: readFile,
		replace: replace
	}

})();