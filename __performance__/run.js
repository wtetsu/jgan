const Hogan = require("hogan.js");
const Jgan = require("../dist");

const hoganCompile = (templateText) => {
  const compiledTemplate = Hogan.compile(templateText);
  return compiledTemplate.render.bind(compiledTemplate);
};

const jganCompile = (templateText) => {
  const compiledTemplate = Jgan.compile(templateText);
  return compiledTemplate.render.bind(compiledTemplate);
};

const test01 = (compile) => {
  const templateText = `firstName:{{firstName}}, lastName:{{lastName}}`;
  const data = {
    firstName:
      "Lorem &'&<>&'<>&'<>&'<>ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    ",
    lastName:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    " +
      "<b>GitHub</b>",
  };
  // const data = {
  //   firstName: "Lorem",
  //   lastName: "<b>GitHub</b>",
  // };
  const compiledTemplate = compile(templateText, { sectionTags: [{ o: "_foo", c: "foo" }] });

  const start = new Date().getTime();

  let total = 0;
  let r;
  for (let i = 0; i < 2000000; i++) {
    r = compiledTemplate(data);
    total += r.length;
  }

  const elapsed = new Date().getTime() - start;
  console.log(r);
  console.log(total);
  console.log(`${elapsed}ms`);
};

console.log("==== Hogan ====");
test01(hoganCompile);

console.log("");
console.log("==== Jgan ====");
test01(jganCompile);
