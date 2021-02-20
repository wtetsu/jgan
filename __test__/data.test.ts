import Hogan from "hogan.js";
import { sayHello, sayGoodbye, tokenize } from "../src/funcs";

test("", () => {
  expect("aaa").toEqual("aaa");
});

test("", () => {
  expect("hi").toEqual(sayHello());
});

test("", () => {
  expect("goodbye").toEqual(sayGoodbye());
});

test("", () => {
  // const text = "my {{_foo}}example{{/foo}} template.";
  // Hogan.compile(text, { sectionTags: [{ o: "_foo", c: "foo" }] });

  const text = "my <%example%> template.";
  const template = Hogan.compile(text, { delimiters: "<% %>" }) as any;
  const r = template.render({ example: "aaaaaaaa" });

  expect("my aaaaaaaa template.").toEqual(r);
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
  const text = "my {{_foo}}example{{/foo}} template";
  const t = Hogan.compile(text, { sectionTags: [{ o: "_foo", c: "foo" }] }) as any;

  const r = t.render({ example: 1 });

  expect("my  template").toEqual(r);
});

test("", () => {
  const text = "my <%example%> template.";
  const template = Hogan.compile(text, { delimiters: "<% %>" }) as any;
  const r = template.render({ example: "aaaaaaaa" });

  expect("my aaaaaaaa template.").toEqual(r);
});

test("", () => {
  const text = `{{#people}}{{firstname}}{{/people}}`;
  const t = Hogan.compile(text, { sectionTags: [{ o: "_foo", c: "foo" }] }) as any;

  const data = {
    people: [
      {
        firstname: "Nils",
        lastname: "Knappmeier",
      },
      {
        firstname: "Yehuda",
        lastname: "Katz",
      },
    ],
  };

  const r = t.render(data);

  expect("NilsYehuda").toEqual(r);
});

test("", () => {
  const text = `{{#depts}}{{#people}}{{  name  }}:{{firstname}},{{/people}}{{/depts}}`;
  const t = Hogan.compile(text, { sectionTags: [{ o: "_foo", c: "foo" }] }) as any;

  const data = {
    depts: [
      {
        name: "Aaa",
        people: [
          {
            firstname: "Nils",
            lastname: "Knappmeier",
          },
          {
            firstname: "Yehuda",
            lastname: "Katz",
          },
        ],
      },
      {
        name: "Bbb",
        people: [
          {
            firstname: "Nils",
            lastname: "Knappmeier",
          },
          {
            firstname: "Yehuda",
            lastname: "Katz",
          },
        ],
      },
    ],
  };

  const r = t.render(data);

  expect("Aaa:Nils,Aaa:Yehuda,Bbb:Nils,Bbb:Yehuda,").toEqual(r);
});

test("", () => {
  {
    const tokens = tokenize("");
    expect(0).toEqual(tokens.length);
  }

  {
    const tokens = tokenize("aaaa");
    expect(1).toEqual(tokens.length);

    if (tokens[0].kind !== "raw_text") throw Error();
    expect("raw_text").toEqual(tokens[0].kind);
    expect("aaaa").toEqual(tokens[0].text);
  }

  {
    const tokens = tokenize("aaaa{{name}}bbbb");
    expect(3).toEqual(tokens.length);

    if (tokens[0].kind !== "raw_text") throw Error();
    expect("raw_text").toEqual(tokens[0].kind);
    expect("aaaa").toEqual(tokens[0].text);

    if (tokens[1].kind !== "variable") throw Error();
    expect("variable").toEqual(tokens[1].kind);
    expect("name").toEqual(tokens[1].id);

    if (tokens[2].kind !== "raw_text") throw Error();
    expect("raw_text").toEqual(tokens[2].kind);
    expect("bbbb").toEqual(tokens[2].text);
  }
});
