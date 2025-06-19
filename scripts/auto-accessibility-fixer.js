"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var glob_1 = __importDefault(require("glob"));
var accessibilityFixes = [
    // Button accessibility fixes
    {
        pattern: /<button([^>]*)>([^<]*)<\/button>/g,
        fix: '<button$1 aria-label="$2">$2</button>',
    },
    // Form element label fixes
    {
        pattern: /<input([^>]*)>/g,
        fix: function (match, p1) {
            var id = Math.random().toString(36).substring(7);
            return "<label for=\"".concat(id, "\">Input field</label><input").concat(p1, " id=\"").concat(id, "\">");
        },
    },
    // Select element accessibility fixes
    {
        pattern: /<select([^>]*)>/g,
        fix: function (match, p1) {
            var id = Math.random().toString(36).substring(7);
            return "<label for=\"".concat(id, "\">Select option</label><select").concat(p1, " id=\"").concat(id, "\">");
        },
    },
];
function findFiles(pattern) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    (0, glob_1.default)(pattern, function (err, files) {
                        if (err)
                            reject(err);
                        else
                            resolve(files);
                    });
                })];
        });
    });
}
function fixAccessibilityIssues(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var content, modified, _i, accessibilityFixes_1, fix, inlineStylePattern, cssFileName, cssFilePath, cssContent_1, classCounter_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, fs_1.promises.readFile(filePath, 'utf-8')];
                case 1:
                    content = _a.sent();
                    modified = false;
                    // Apply each fix
                    for (_i = 0, accessibilityFixes_1 = accessibilityFixes; _i < accessibilityFixes_1.length; _i++) {
                        fix = accessibilityFixes_1[_i];
                        if (fix.pattern.test(content)) {
                            content = content.replace(fix.pattern, fix.fix);
                            modified = true;
                        }
                    }
                    inlineStylePattern = /style=["']([^"']+)["']/g;
                    if (!inlineStylePattern.test(content)) return [3 /*break*/, 3];
                    cssFileName = path_1.default.basename(filePath, path_1.default.extname(filePath)) + '.module.css';
                    cssFilePath = path_1.default.join(path_1.default.dirname(filePath), cssFileName);
                    cssContent_1 = '';
                    classCounter_1 = 1;
                    content = content.replace(inlineStylePattern, function (match, styles) {
                        var className = "autoFixed".concat(classCounter_1);
                        cssContent_1 += ".".concat(className, " {\n  ").concat(styles.replace(/;/g, ';\n  '), "\n}\n\n");
                        classCounter_1++;
                        return "className=\"".concat(className, "\"");
                    });
                    if (!cssContent_1) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs_1.promises.writeFile(cssFilePath, cssContent_1)];
                case 2:
                    _a.sent();
                    modified = true;
                    _a.label = 3;
                case 3:
                    if (!modified) return [3 /*break*/, 5];
                    return [4 /*yield*/, fs_1.promises.writeFile(filePath, content)];
                case 4:
                    _a.sent();
                    console.log("Fixed accessibility issues in: ".concat(filePath));
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Error processing ".concat(filePath, ":"), error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var files, _a, _b, _c, _i, files_1, file;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, findFiles('./app/**/*.{tsx,jsx}')];
                case 1:
                    files = _d.sent();
                    _b = (_a = files.push).apply;
                    _c = [files];
                    return [4 /*yield*/, findFiles('./components/**/*.{tsx,jsx}')];
                case 2:
                    _b.apply(_a, _c.concat([(_d.sent())]));
                    _i = 0, files_1 = files;
                    _d.label = 3;
                case 3:
                    if (!(_i < files_1.length)) return [3 /*break*/, 6];
                    file = files_1[_i];
                    return [4 /*yield*/, fixAccessibilityIssues(file)];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
