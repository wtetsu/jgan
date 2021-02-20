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
          result += escapeHtml(value.toString());
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

type TokenKind = Token["kind"];

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
