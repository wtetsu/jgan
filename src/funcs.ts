// import { Template } from "hogan.js";

// import dayjs from "dayjs";
import Hogan from "hogan.js";

export function sayHello() {
  console.log("hi");
  return "hi";
}
export function sayGoodbye() {
  console.log("goodbye");
  return "goodbye";
}

export function hogan(template: string) {
  // return dayjs().toDate();
  return Hogan.compile(template);
}

export function compile(template: string): Template {
  //
  return new Template();
}

export const tokenize = (template: string): Token[] => {
  let index = 0;
  const beginWith = (tokenString: string): boolean => {
    return template.substring(index, index + tokenString.length) === tokenString;
  };

  const find = (tokenString: string) => {
    const closeTokenIndex = template.indexOf(tokenString, index);
    return closeTokenIndex >= 0 ? closeTokenIndex : -1;
  };

  const tokens: Token[] = [];

  // let processedIndex = 0;

  for (let i = 0; i < 10; i++) {
    if (index >= template.length) {
      break;
    }

    const nextIndex = find("{{");
    // console.warn(`${template}: ${nextIndex} ${index} ${template.substring(index)}`);
    // console.warn(template.substring(index, index + 2) === "{{");
    // console.warn(beginWith("{{"));

    if (nextIndex >= 0) {
      if (nextIndex > index) {
        const text = template.substring(index, nextIndex);
        tokens.push({ kind: "raw_text", text });
        index = nextIndex;
      }
    } else {
      const text = template.substring(index);
      tokens.push({ kind: "raw_text", text });
      break;
    }

    if (beginWith("{{{")) {
      const closeIndex = find("}}}");
      const id = template.substring(index + 3, closeIndex);
      tokens.push({ kind: "variable", id, escape: false });
      index = closeIndex + 3;
    } else if (beginWith("{{")) {
      const closeIndex = find("}}");
      const id = template.substring(index + 2, closeIndex);
      tokens.push({ kind: "variable", id, escape: true });
      index = closeIndex + 2;
    } else {
      // console.warn("@@@@@@@@@@@@@@@@@");
    }
  }

  return tokens;
};

// class Tokenizer {
//   private readonly template: string;

//   constructor(template: string) {
//     this.template = template;
//   }

//   run(): Token[] {
//     const tokens: Token[] = [];

//     let index = 0;
//     for (;;) {
//       if (this.consume("{{{")) {
//       } else if (this.consume("{{{")) {
//       } else if (this.consume("{{{")) {
//       }
//     }
//     return tokens;
//   }

//   consume(text: string): boolean {

//   }
// }

type Token =
  | {
      kind: "raw_text";
      text: string;
    }
  | {
      kind: "variable";
      id: string;
      escape: boolean;
    }
  | {
      kind: "open1";
    }
  | {
      kind: "open2";
    };

// const parse = (template: string) => {
//   let index = 0;
//   for (;;) {
//     const ch = template[index];

//     if (ch === "{") {
//       let insideIndex;
//       let closeToken;
//       if (template.substring(index, index + 3) === "{{{") {
//         insideIndex = index + 3;
//         closeToken = "}}}";
//       } else if (template.substring(index, index + 2) === "{{") {
//         insideIndex = index + 2;
//         closeToken = "}}";
//       }

//       if (closeToken) {
//         const closeIndex = findCloseToken(template, index, closeToken);

//         const inner = template.substring(insideIndex, closeIndex);
//       } else {
//         throw Error(`${closeToken} not found`);
//       }
//     }
//   }
// };

class Template {
  render(): string {
    return "";
  }
}

// class Variable {
//   readonly name: string;
//   readonly escape: boolean;

//   constructor() {
//     //
//   }
// }
