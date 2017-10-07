'use stric';
var DM = require('./DirectoryManager');
var _ = require('underscore');
var filter = 'html';
var templates = require('./Templates');
var paths = [];

var extension = "html";
var rootPath = "/web/webhost/nodejs/adn40/_elastic/noticia/mexico/";
var start = new Date("2017 03 01");
var end = new Date("2017 11 01");



var htmlContent = [];

_.each(templates, function(element, index){
	templates[index] = DM.readFile(element);
});

paths = DM.getPaths(rootPath, extension, start, end);
DM.replace(paths, templates);











