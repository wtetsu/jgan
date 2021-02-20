const Jgan = require("../dist");

const test01 = () => {
  const templateText = `firstName:{{firstName}}, lastName:{{lastName}}`;
  const data = {
    firstName: "Nils",
    lastName: "Knappmeier",
  };

  const compiledTemplate = Jgan.compile(templateText);

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
