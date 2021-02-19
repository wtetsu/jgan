import { sayHello, sayGoodbye } from "../src/funcs";

test("", () => {
  expect("aaa").toEqual("aaa");
});

test("", () => {
  expect("hi").toEqual(sayHello());
});

test("", () => {
  expect("goodbye").toEqual(sayGoodbye());
});
