const Hogan = require("hogan.js");

const test01 = () => {
  const templateText = `firstName:{{firstName}}, lastName:{{lastName}}`;
  const data = {
    firstName: "Nils",
    lastName: "<b>GitHub</b>",
  };

  const compiledTemplate = Hogan.compile(templateText, { sectionTags: [{ o: "_foo", c: "foo" }] });

  const start = new Date().getTime();

  let total = 0;
  let r;
  for (let i = 0; i < 10000000; i++) {
    r = compiledTemplate.render(data);
    total += r.length;
  }

  const elapsed = new Date().getTime() - start;
  console.log(r);
  console.log(total);
  console.log(`${elapsed}ms`);
};

test01();

/*
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
  // const text = "my {{_foo}}example{{/foo}} template.";
  // Hogan.compile(text, { sectionTags: [{ o: "_foo", c: "foo" }] });

  const text = "my <%example%> template.";
  const template = Hogan.compile(text, { delimiters: "<% %>" }) as any;
  const r = template.render({ example: "aaaaaaaa" });

  expect("my aaaaaaaa template.").toEqual(r);
});

*/
