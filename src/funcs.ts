// import { Template } from "hogan.js";

// import dayjs from "dayjs";
// import Hogan from "hogan.js";

export function sayHello() {
  // console.log("hi");
  return "hi";
}
export function sayGoodbye() {
  // console.log("goodbye");
  return "goodbye";
}

export function sayGoodbye2() {
  // console.log("goodbye");
  return "goodbye!!!";
}

export function compile(template: string): Template {
  const tokens = tokenize(template);
  const nodes = parse(tokens);
  return new Template(nodes);
}

const parse = (tokens: Token[]): Node[] => {
  let index = 0;
  // let currentNode: Node;

  const nodes: Node[] = [];

  // const consume = (tokenKind: TokenKind) => {
  //   if (tokens[index].kind !== tokenKind) {
  //     return false;
  //   }

  //   return false;
  // };

  for (;;) {
    if (index >= tokens.length) {
      break;
    }

    const currentToken = tokens[index];

    if (currentToken.kind === "raw_text") {
      const newNode = newRawTextNode(currentToken.text);
      nodes.push(newNode);
      index++;
      continue;
    }
    if (currentToken.kind === "variable") {
      const newNode = newVariableNode(currentToken.id, currentToken.escape);
      nodes.push(newNode);
      index++;
      continue;
    }
    throw Error();
  }

  return nodes;
};

class Template {
  private readonly nodes: Node[];
  constructor(nodes: Node[]) {
    this.nodes = nodes;
  }

  render(data: Record<string, any>): string {
    let result = "";

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      if (node.kind === "raw_text") {
        result += node.text;
        continue;
      }

      if (node.kind === "variable") {
        const value = data[node.id];
        if (value === null || value === undefined) {
          continue;
        }
        if (node.escape) {
          // result += hoganEscape(value.toString());
          // result += escapeHtml3(value.toString());
          result += fastReplace(value.toString());
          // result += fastReplace2(value.toString());
          // result += fastReplace3(value.toString());
        } else {
          result += value.toString();
        }
        continue;
      }
    }

    return result;
  }
}

const newRawTextNode = (text: string): Node => {
  return {
    kind: "raw_text",
    text,
  };
};

const newVariableNode = (id: string, escape: boolean): Node => {
  return {
    kind: "variable",
    id,
    escape,
  };
};

type Node =
  | {
      kind: "raw_text";
      text: string;
    }
  | {
      kind: "variable";
      id: string;
      escape: boolean;
    };

// type NodeKind = Node["kind"];

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
      kind: "open_condition";
      id: string;
    }
  | {
      kind: "close_condition";
      id: string;
    };

// type TokenKind = Token["kind"];

type Capture = {
  token: Token;
  next: number;
};

export const tokenize = (template: string): Token[] => {
  let index = 0;
  const beginWith = (tokenString: string): boolean => {
    return template.substring(index, index + tokenString.length) === tokenString;
  };

  const find = (tokenString: string) => {
    const closeTokenIndex = template.indexOf(tokenString, index);
    return closeTokenIndex >= 0 ? closeTokenIndex : -1;
  };

  const captureToken = (open: string, close: string) => {
    const closeIndex = find(close);
    if (closeIndex < 0) {
      throw new Error(template);
    }
    const id = template.substring(index + open.length, closeIndex);
    const next = closeIndex + close.length;
    return { id, next };
  };

  const captureVariableToken = (open: string, close: string, escape: boolean): Capture => {
    const r = captureToken(open, close);
    const token: Token = { kind: "variable", id: r.id, escape };
    return { next: r.next, token };
  };

  const captureOpenConditionToken = (open: string, close: string): Capture => {
    const r = captureToken(open, close);
    const token: Token = { kind: "open_condition", id: r.id };
    return { next: r.next, token };
  };

  const captureCloseConditionToken = (open: string, close: string): Capture => {
    const r = captureToken(open, close);
    const token: Token = { kind: "close_condition", id: r.id };
    return { next: r.next, token };
  };

  const tokens: Token[] = [];

  for (let i = 0; i < 10; i++) {
    if (index >= template.length) {
      break;
    }

    const nextIndex = find("{{");

    if (nextIndex < 0) {
      const text = template.substring(index);
      tokens.push({ kind: "raw_text", text });
      break;
    }

    if (nextIndex > index) {
      const text = template.substring(index, nextIndex);
      tokens.push({ kind: "raw_text", text });
      index = nextIndex;
    }

    if (beginWith("{{{")) {
      const r = captureVariableToken("{{{", "}}}", false);
      tokens.push(r.token);
      index = r.next;
    } else if (beginWith("{{#")) {
      const r = captureOpenConditionToken("{{#", "}}");
      tokens.push(r.token);
      index = r.next;
    } else if (beginWith("{{/")) {
      const r = captureCloseConditionToken("{{/", "}}");
      tokens.push(r.token);
      index = r.next;
    } else if (beginWith("{{")) {
      const r = captureVariableToken("{{", "}}", true);
      tokens.push(r.token);
      index = r.next;
    } else {
      throw new Error();
    }
  }

  return tokens;
};

const mapForEscapeHtml: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

const reForEscapeHtml = /&|<|>|"/g;

const escapeHtml = (str: string) => {
  return str.replace(reForEscapeHtml, (ch: string) => mapForEscapeHtml[ch]);
};

var rAmp = /&/g,
  rLt = /</g,
  rGt = />/g,
  rApos = /\'/g,
  rQuot = /\"/g,
  hChars = /[&<>\"\']/;

function hoganEscape(str: string) {
  return hChars.test(str) ? str.replace(rAmp, "&amp;").replace(rLt, "&lt;").replace(rGt, "&gt;").replace(rApos, "&#39;").replace(rQuot, "&quot;") : str;
}

const map = new Map([
  ["&", "&amp;"],
  ["<", "&lt;"],
  [">", "&gt;"],
  ["'", "&#39;"],
]);

const ch1 = "&".charCodeAt(0);
const ch2 = "<".charCodeAt(0);
const ch3 = ">".charCodeAt(0);
const ch4 = "'".charCodeAt(0);

const map2 = new Map<number, string>([
  [ch1, "&amp;"],
  [ch2, "&lt;"],
  [ch3, "&gt;"],
  [ch4, "&#39;"],
]);

const escapeHtml3 = (str: string) => {
  if (!hChars.test(str)) {
    return str;
  }
  let result = "";

  let startIndex = 0;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const code = str.charCodeAt(i);
    if (!(code == ch1 || code == ch2 || code == ch3 || code == ch4)) {
      continue;
    }
    result += str.substring(startIndex, i);
    result += map2.get(code);
    startIndex = i + 1;
    // const code = str.charCodeAt(i);
    // if (!(code == ch1 || code == ch2 || code == ch3 || code == ch4)) {
    //   continue;
    // }
    // result += str.substring(startIndex, i);
    // result += map2.get(code);
    // startIndex = i + 1;

    // const n = map.get(str[i]);
    // if (n) {
    //   result += str.substring(startIndex, i);
    //   result += n;
    //   startIndex = i + 1;
    // }
  }
  result += str.substring(startIndex);
  return result;
};

const map3: string[] = [];
for (let i = 0; i < 255; i++) {
  map3.push("");
}
map3[38] = "&amp;";
map3[60] = "&lt;";
map3[62] = "&gt;";
map3[39] = "&#39;";

const fastReplace = (str: string) => {
  const replaces: [number, string][] = [];

  const len = str.length;
  for (let i = 0; i < len; i++) {
    const code = str.charCodeAt(i);
    const r = map3[code];
    if (!r) {
      continue;
    }
    replaces.push([i, r]);
  }

  if (replaces.length == 0) {
    return str;
  }

  let result = "";

  let lastIndex = 0;
  for (let i = 0; i < replaces.length; i++) {
    const r = replaces[i];

    result += str.substring(lastIndex, r[0]);
    result += r[1];
    lastIndex = r[0] + 1;
  }

  result += str.substring(lastIndex);

  return result;
};

const fastReplaceC = (str: string) => {
  const replaces: [number, string][] = [];

  const len = str.length;
  for (let i = 0; i < len; i++) {
    const code = str.charCodeAt(i);
    const r = map3[code];
    if (!r) {
      continue;
    }
    replaces.push([i, r]);
  }

  if (replaces.length == 0) {
    return str;
  }

  const result = new Array(10);

  let lastIndex = 0;
  let index = 0;
  for (let i = 0; i < replaces.length; i++) {
    const r = replaces[i];

    result[index++] = str.substring(lastIndex, r[0]);
    result[index++] = r[1];
    lastIndex = r[0] + 1;
  }

  result[index++] = str.substring(lastIndex);

  return "";
};

const fastReplace2 = (str: string) => {
  const replaces: string[] = [];

  let lastIndex = 0;

  const len = str.length;
  for (let i = 0; i < len; i++) {
    const code = str.charCodeAt(i);
    const r = map3[code];
    if (!r) {
      continue;
    }

    replaces.push(str.substring(lastIndex, i));
    replaces.push(r);
    lastIndex = i + 1;
  }

  replaces.push(str.substring(lastIndex));
  return replaces.join("");
};

const fastReplace3 = (str: string) => {
  let result = "";

  let lastIndex = 0;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const code = str.charCodeAt(i);
    const r = map3[code];
    if (!r) {
      continue;
    }
    result += str.substring(lastIndex, i);
    result += r;
    lastIndex = i + 1;
  }

  result += str.substring(lastIndex);

  return result;
};
