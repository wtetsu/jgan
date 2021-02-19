"use strict";
// import { Template } from "hogan.js";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = exports.compile = exports.hogan = exports.sayGoodbye = exports.sayHello = void 0;
// import dayjs from "dayjs";
var hogan_js_1 = __importDefault(require("hogan.js"));
function sayHello() {
    console.log("hi");
    return "hi";
}
exports.sayHello = sayHello;
function sayGoodbye() {
    console.log("goodbye");
    return "goodbye";
}
exports.sayGoodbye = sayGoodbye;
function hogan(template) {
    // return dayjs().toDate();
    return hogan_js_1.default.compile(template);
}
exports.hogan = hogan;
function compile(template) {
    //
    return new Template();
}
exports.compile = compile;
exports.tokenize = function (template) {
    var index = 0;
    var beginWith = function (tokenString) {
        return tokenString.substring(index + tokenString.length) === tokenString;
    };
    var find = function (tokenString) {
        var closeTokenIndex = template.indexOf(tokenString, index);
        return closeTokenIndex >= 0 ? closeTokenIndex - 1 : -1;
    };
    var tokens = [];
    var processedIndex = 0;
    for (;;) {
        console.warn(index);
        console.warn(template.substring(index));
        if (index >= template.length) {
            break;
        }
        var nextIndex = find("{{");
        if (nextIndex >= 0) {
            if (nextIndex > processedIndex) {
                var text = template.substring(processedIndex, nextIndex);
                tokens.push({ kind: "raw_text", text: text });
                index = nextIndex + 1;
            }
        }
        else {
            var text = template.substring(processedIndex);
            tokens.push({ kind: "raw_text", text: text });
            break;
        }
        if (beginWith("{{{")) {
            var closeIndex = find("}}}");
            var id = template.substring(index + 3, closeIndex - 1);
            tokens.push({ kind: "variable", id: id, escape: false });
            index = closeIndex + 3;
        }
        else if (beginWith("{{")) {
            var closeIndex = find("}}");
            var id = template.substring(index + 2, closeIndex - 1);
            tokens.push({ kind: "variable", id: id, escape: true });
            index = closeIndex + 2;
        }
    }
    return tokens;
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
var Template = /** @class */ (function () {
    function Template() {
    }
    Template.prototype.render = function () {
        return "";
    };
    return Template;
}());
// class Variable {
//   readonly name: string;
//   readonly escape: boolean;
//   constructor() {
//     //
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmdW5jcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUNBQXVDOzs7Ozs7QUFFdkMsNkJBQTZCO0FBQzdCLHNEQUE2QjtBQUU3QixTQUFnQixRQUFRO0lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBSEQsNEJBR0M7QUFDRCxTQUFnQixVQUFVO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkIsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUhELGdDQUdDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLFFBQWdCO0lBQ3BDLDJCQUEyQjtJQUMzQixPQUFPLGtCQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFIRCxzQkFHQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxRQUFnQjtJQUN0QyxFQUFFO0lBQ0YsT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQ3hCLENBQUM7QUFIRCwwQkFHQztBQUVZLFFBQUEsUUFBUSxHQUFHLFVBQUMsUUFBZ0I7SUFDdkMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsSUFBTSxTQUFTLEdBQUcsVUFBQyxXQUFtQjtRQUNwQyxPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLENBQUM7SUFDM0UsQ0FBQyxDQUFDO0lBRUYsSUFBTSxJQUFJLEdBQUcsVUFBQyxXQUFtQjtRQUMvQixJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RCxPQUFPLGVBQWUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQztJQUVGLElBQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQztJQUUzQixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFFdkIsU0FBUztRQUNQLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFeEMsSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUM1QixNQUFNO1NBQ1A7UUFFRCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO1lBQ2xCLElBQUksU0FBUyxHQUFHLGNBQWMsRUFBRTtnQkFDOUIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztnQkFDeEMsS0FBSyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDdkI7U0FDRjthQUFNO1lBQ0wsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7WUFDeEMsTUFBTTtTQUNQO1FBRUQsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEIsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxJQUFBLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDckQsS0FBSyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7U0FDeEI7YUFBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNwRCxLQUFLLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUN4QjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBNENGLHdDQUF3QztBQUN4QyxtQkFBbUI7QUFDbkIsZUFBZTtBQUNmLGtDQUFrQztBQUVsQyx3QkFBd0I7QUFDeEIseUJBQXlCO0FBQ3pCLHdCQUF3QjtBQUN4Qiw4REFBOEQ7QUFDOUQsbUNBQW1DO0FBQ25DLDhCQUE4QjtBQUM5QixvRUFBb0U7QUFDcEUsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QixVQUFVO0FBRVYsMEJBQTBCO0FBQzFCLDBFQUEwRTtBQUUxRSxxRUFBcUU7QUFDckUsaUJBQWlCO0FBQ2pCLGtEQUFrRDtBQUNsRCxVQUFVO0FBQ1YsUUFBUTtBQUNSLE1BQU07QUFDTixLQUFLO0FBRUw7SUFBQTtJQUlBLENBQUM7SUFIQyx5QkFBTSxHQUFOO1FBQ0UsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRUQsbUJBQW1CO0FBQ25CLDJCQUEyQjtBQUMzQiw4QkFBOEI7QUFFOUIsb0JBQW9CO0FBQ3BCLFNBQVM7QUFDVCxNQUFNO0FBQ04sSUFBSSJ9