const Hogan = require("hogan.js");
const Handlebars = require("Handlebars");

const templateText = "aaa{{name}bbb";

const t = Hogan.compile(templateText);
console.info(t.render({ name: 123 }));

// var t2 = Handlebars.compile(templateText);
// console.info(t2({ name: 123 }));
