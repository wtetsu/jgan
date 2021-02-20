import { sayHello, sayGoodbye, tokenize, compile } from "../src/funcs";

test("", () => {
  expect("aaa").toEqual("aaa");
});

test("", () => {
  expect("hi").toEqual(sayHello());
});

test("", () => {
  expect("goodbye").toEqual(sayGoodbye());
});

// test("", () => {
//   // const text = "my {{_foo}}example{{/foo}} template.";
//   // Hogan.compile(text, { sectionTags: [{ o: "_foo", c: "foo" }] });

//   const text = "!!!}} }} }}} }}} }}}} {{";
//   const template = Hogan.compile(text);
//   const r = template.render({
//     firstname: "Yehuda",
//     lastname: "Katz",
//   });

//   expect("!!!{{firstname}} {{lastname}}!!!").toEqual(r);
// });

test("", () => {
  {
    const tokens = tokenize("");
    expect(tokens.length).toEqual(0);
  }

  {
    const tokens = tokenize("aaaa");
    expect(tokens.length).toEqual(1);

    if (tokens[0].kind !== "raw_text") throw Error();
    expect(tokens[0].kind).toEqual("raw_text");
    expect(tokens[0].text).toEqual("aaaa");
  }

  {
    const tokens = tokenize("aaaa{{name}}bbbb");
    expect(3).toEqual(tokens.length);

    if (tokens[0].kind !== "raw_text") throw Error();
    expect(tokens[0].kind).toEqual("raw_text");
    expect(tokens[0].text).toEqual("aaaa");

    if (tokens[1].kind !== "variable") throw Error();
    expect(tokens[1].kind).toEqual("variable");
    expect(tokens[1].id).toEqual("name");

    if (tokens[2].kind !== "raw_text") throw Error();
    expect(tokens[2].kind).toEqual("raw_text");
    expect(tokens[2].text).toEqual("bbbb");
  }
});

test("", () => {
  const template = compile("aaaa{{name}}bbbb");
  expect(template.render({})).toEqual("aaaabbbb");
  expect(template.render({ name: 123 })).toEqual("aaaa123bbbb");
  expect(template.render({ name: "<script>" })).toEqual("aaaa&lt;script&gt;bbbb");
});

test("", () => {
  const template = compile("aaaa{{{name}}}bbbb");
  expect(template.render({})).toEqual("aaaabbbb");
  expect(template.render({ name: 123 })).toEqual("aaaa123bbbb");
  expect(template.render({ name: "<script>" })).toEqual("aaaa<script>bbbb");
});

// test("", () => {
//   const template = compile("aaaa{{#users}}Hello!{{/users}}bbbb");
//   expect(template.render({})).toEqual("aaaabbbb");
//   expect(template.render({ name: 123 })).toEqual("aaaa123bbbb");
//   expect(template.render({ name: "<script>" })).toEqual("aaaa<script>bbbb");
// });
