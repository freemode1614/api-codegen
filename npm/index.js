import process2 from 'node:process';
import os from 'node:os';
import tty from 'node:tty';
import * as prettier from 'prettier';
import nodefs from 'node:fs/promises';
import { Agent, setGlobalDispatcher } from 'undici';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// node_modules/.pnpm/tsup@8.3.5_jiti@1.21.7_postcss@8.4.49_typescript@5.7.2_yaml@2.7.0/node_modules/tsup/assets/esm_shims.js
var init_esm_shims = __esm({
  "node_modules/.pnpm/tsup@8.3.5_jiti@1.21.7_postcss@8.4.49_typescript@5.7.2_yaml@2.7.0/node_modules/tsup/assets/esm_shims.js"() {
  }
});

// node_modules/.pnpm/openapi-types@12.1.3/node_modules/openapi-types/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/openapi-types@12.1.3/node_modules/openapi-types/dist/index.js"(exports) {
    init_esm_shims();
    exports.__esModule = true;
    exports.OpenAPIV2 = exports.OpenAPIV3 = void 0;
    (function(OpenAPIV34) {
      (function(HttpMethods2) {
        HttpMethods2["GET"] = "get";
        HttpMethods2["PUT"] = "put";
        HttpMethods2["POST"] = "post";
        HttpMethods2["DELETE"] = "delete";
        HttpMethods2["OPTIONS"] = "options";
        HttpMethods2["HEAD"] = "head";
        HttpMethods2["PATCH"] = "patch";
        HttpMethods2["TRACE"] = "trace";
      })(OpenAPIV34.HttpMethods || (OpenAPIV34.HttpMethods = {}));
    })(exports.OpenAPIV3 || (exports.OpenAPIV3 = {}));
    (function(OpenAPIV22) {
      (function(HttpMethods2) {
        HttpMethods2["GET"] = "get";
        HttpMethods2["PUT"] = "put";
        HttpMethods2["POST"] = "post";
        HttpMethods2["DELETE"] = "delete";
        HttpMethods2["OPTIONS"] = "options";
        HttpMethods2["HEAD"] = "head";
        HttpMethods2["PATCH"] = "patch";
      })(OpenAPIV22.HttpMethods || (OpenAPIV22.HttpMethods = {}));
    })(exports.OpenAPIV2 || (exports.OpenAPIV2 = {}));
  }
});

// src/index.ts
init_esm_shims();

// src/adapters/openapi/OpenAPIV2.ts
init_esm_shims();
var OpenApiV2 = class {
  // eslint-disable-next-line @typescript-eslint/require-await
  async parse() {
    return "";
  }
};

// src/adapters/openapi/OpenAPIV3.ts
init_esm_shims();

// node_modules/.pnpm/@moccona+logger@0.0.1/node_modules/@moccona/logger/npm/index.js
init_esm_shims();

// node_modules/.pnpm/chalk@5.4.1/node_modules/chalk/source/index.js
init_esm_shims();

// node_modules/.pnpm/chalk@5.4.1/node_modules/chalk/source/vendor/ansi-styles/index.js
init_esm_shims();
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
[...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/chalk@5.4.1/node_modules/chalk/source/vendor/supports-color/index.js
init_esm_shims();
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process2.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = process2;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (process2.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
  stderr: createSupportsColor({ isTTY: tty.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/.pnpm/chalk@5.4.1/node_modules/chalk/source/utilities.js
init_esm_shims();
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/.pnpm/chalk@5.4.1/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// node_modules/.pnpm/@moccona+logger@0.0.1/node_modules/@moccona/logger/npm/index.js
var isBrowser = "HTMLElement" in globalThis;
var DEV = isBrowser ? import.meta.env.DEV : process.env.NODE_ENV === "development";
var PROD = isBrowser ? import.meta.PROD : process.env.NODE_ENV === "production";
var currentLevel = DEV ? "debug" : "info";
var isWorker = "HTMLRewriter" in globalThis;
var supportsColor2 = !isWorker;
function createScopedLogger(scope) {
  return {
    trace: (...messages) => log("trace", scope, messages),
    debug: (...messages) => log("debug", scope, messages),
    info: (...messages) => log("info", scope, messages),
    warn: (...messages) => log("warn", scope, messages),
    error: (...messages) => log("error", scope, messages),
    setLevel
  };
}
function setLevel(level) {
  if ((level === "trace" || level === "debug") && PROD) {
    return;
  }
  currentLevel = level;
}
function log(level, scope, messages) {
  const levelOrder = ["trace", "debug", "info", "warn", "error"];
  if (levelOrder.indexOf(level) < levelOrder.indexOf(currentLevel)) {
    return;
  }
  const allMessages = messages.reduce((accumulator, current) => {
    if (accumulator.endsWith("\n")) {
      return accumulator + current;
    }
    if (!accumulator) {
      return current;
    }
    return `${accumulator} ${current}`;
  }, "");
  if (!supportsColor2) {
    console.log(`[${level.toUpperCase()}]`, allMessages);
    return;
  }
  const labelBackgroundColor = getColorForLevel(level);
  const labelTextColor = level === "warn" ? "#000000" : "#FFFFFF";
  if (isBrowser) {
    const labelStyles = getLabelStyles(labelBackgroundColor, labelTextColor);
    const scopeStyles = getLabelStyles("#77828D", "#FFFFFF");
    const styles3 = [labelStyles];
    {
      styles3.push("", scopeStyles);
    }
    console.log(`%c${level.toUpperCase()}${`%c %c${scope}` }`, ...styles3, allMessages);
  } else {
    const labelStyled = getStyledLabel(labelBackgroundColor, labelTextColor, level.toUpperCase());
    const scopeStyled = getStyledLabel("#77828D", "white", scope);
    console.log(labelStyled, scopeStyled, allMessages);
  }
}
function getLabelStyles(color, textColor) {
  return `background-color: ${color}; color: white; border: 4px solid ${color}; color: ${textColor}; `;
}
function getStyledLabel(bgColor, textColor, text) {
  return text ? source_default.bgHex(bgColor).hex(textColor).bold(text) : "";
}
function getColorForLevel(level) {
  switch (level) {
    case "trace":
    case "debug": {
      return "#77828D";
    }
    case "info": {
      return "#1389FD";
    }
    case "warn": {
      return "#FFDB6C";
    }
    case "error": {
      return "#EE4744";
    }
    default: {
      return "#000000";
    }
  }
}

// src/adapters/openapi/OpenAPIV3.ts
var import_openapi_types = __toESM(require_dist());

// src/types/openapi.ts
init_esm_shims();
var isV3ReferenceObject = (schema) => !!schema?.$ref;
var isV3_1ReferenceObject = (schema) => !!schema?.$ref;
var isV3ArrySchemaObject = (schema) => !!schema?.items || schema.type === "array";

// src/types/type.ts
init_esm_shims();
var unionType = Symbol("union");
var intersectionType = Symbol("intersection");
var isTypeParameter = (t) => {
  try {
    return !!(t.name && Object.keys(t).length === 1);
  } catch {
    return false;
  }
};
var isTypeLiteral = (t) => {
  try {
    return !!(t.members && Object.keys(t).length === 1);
  } catch {
    return false;
  }
};
var isIntersectionType = (t) => {
  try {
    return !!(t.name && t.name === intersectionType && Object.keys(t).length === 2);
  } catch {
    return false;
  }
};
var isUnionType = (t) => {
  try {
    return !!(t.name && t.name === unionType && Object.keys(t).length === 2);
  } catch {
    return false;
  }
};
var isTypeReference = (t) => {
  try {
    return !!t.typeName;
  } catch {
    return false;
  }
};
var isArrayType = (t) => {
  try {
    return !!("elementType" in t);
  } catch {
    return false;
  }
};

// src/utils/format2type.ts
init_esm_shims();
var formatMapping = {
  int32: "number",
  int64: "number",
  float: "number",
  double: "number",
  integer: "number",
  password: "string",
  string: "string",
  date: "string",
  "date-time": "string",
  byte: "string",
  binary: "File",
  boolean: "boolean",
  null: "null",
  file: "File",
  uri: "string",
  uuid: "string",
  json: "string"
};
function format2type(type) {
  return formatMapping[type];
}

// src/utils/formatCode.ts
init_esm_shims();
async function formatCode(code, options = {}) {
  try {
    const defaultOptions = {
      parser: "typescript",
      semi: true,
      tabWidth: 2,
      printWidth: 80,
      ...options
    };
    const formattedCode = await prettier.format(code, defaultOptions);
    return formattedCode;
  } catch (error) {
    console.error("Error formatting code:", error);
    return code;
  }
}

// src/utils/isSameEnum.ts
init_esm_shims();
function isSameEnum(a, b) {
  if (a.length !== b.length) return false;
  return a.sort().every((v, index) => v === b.sort()[index]);
}

// src/utils/normalizeName.ts
init_esm_shims();
var typescriptKeywords = /* @__PURE__ */ new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "as",
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
  "abstract",
  "any",
  "async",
  "await",
  "constructor",
  "declare",
  "from",
  "get",
  "is",
  "module",
  "namespace",
  "never",
  "require",
  "set",
  "type",
  "unknown",
  "readonly",
  "of",
  "asserts",
  "infer",
  "keyof",
  "boolean",
  "number",
  "string",
  "symbol",
  // "object",
  "undefined",
  "bigint"
]);
function normalizeName(name) {
  if (typescriptKeywords.has(name)) {
    name += "Object";
  }
  return name.replace(/[/\-_{}():\s`,*<>$]/g, "_").replaceAll("...", "");
}

// src/utils/pathToName.ts
init_esm_shims();
var capitalize = (text) => {
  text = normalizeName(text).trim();
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};
var camelCase = (text) => {
  return normalizeName(text).split("_").filter(Boolean).map((text2, index) => index === 0 ? text2 : capitalize(text2)).join("");
};
var upperCamelCase = (text) => {
  return normalizeName(text).replaceAll("...", "").split("_").filter(Boolean).map(capitalize).join("");
};
function pathToName(path, method, operationId) {
  const name = camelCase(path);
  const suffix = method ? capitalize(upperCamelCase(`using_${method}`)) : "";
  return (operationId ? camelCase(normalizeName(operationId)) : name) + suffix;
}

// src/utils/reference2name.ts
init_esm_shims();
function reference2name(ref) {
  return ref.split("/").pop();
}

// src/utils/writetoFile.ts
init_esm_shims();
async function writeToFile(filePath, data) {
  try {
    await nodefs.writeFile(filePath, data);
  } catch (error) {
    console.error(error);
  }
}

// src/adapters/openapi/OpenAPIV3.ts
var logger = createScopedLogger("OpenAPIV3");
var OpenApiV3 = class {
  /** Store for enum definitions generated during parsing */
  enums = {};
  /** Client instance for code generation */
  client;
  /**
   * Returns the banner comment for generated code
   * Including version, title and description from OpenAPI doc
   */
  get banner() {
    const { info } = this.doc;
    const { version, title, description } = info;
    return this.client.comment([
      {
        comment: version
      },
      { comment: title },
      { comment: description ?? "" }
    ]);
  }
  get schemas() {
    const { components } = this.doc;
    if (components) {
      const { schemas = {}, requestBodies = {}, responses = {} } = components;
      const schemas_ = schemas;
      return {
        ...schemas,
        ...this.analyzeMediaSchemas(schemas_, requestBodies),
        ...this.analyzeMediaSchemas(schemas_, responses)
      };
    }
    return {};
  }
  get parameters() {
    const { components } = this.doc;
    if (components) {
      const { parameters = {}, headers = {} } = components;
      return {
        ...headers,
        ...parameters
      };
    }
    return {};
  }
  analyzeMediaSchemas(schemas, mediaSchemas) {
    const resolveReference = (ref) => schemas[reference2name(ref)];
    const otherSchemasWithNoReference = {};
    return Object.entries(mediaSchemas).reduce((acc, [key, schema]) => {
      key = upperCamelCase(normalizeName(key));
      if (isV3ReferenceObject(schema)) {
        return Object.assign(acc, {
          [key]: resolveReference(schema.$ref)
        });
      }
      const { content } = schema;
      if (!content) {
        return acc;
      }
      const mediaTypeSchema = ("application/json" in content ? content["application/json"] : "*/*" in content ? content["*/*"] : Object.values(content)[0]).schema;
      if (!mediaTypeSchema) {
        return acc;
      }
      if (mediaTypeSchema.$ref) {
        return Object.assign(acc, {
          [key]: resolveReference(mediaTypeSchema.$ref)
        });
      }
      return Object.assign(acc, {
        [key]: mediaTypeSchema
      });
    }, otherSchemasWithNoReference);
  }
  expandSchemaObject(schema, parentName) {
    if (isV3ReferenceObject(schema)) return upperCamelCase(reference2name(schema.$ref));
    if (isV3ArrySchemaObject(schema)) {
      const { items } = schema;
      if (isV3ReferenceObject(items)) {
        return {
          elementType: upperCamelCase(reference2name(items.$ref))
        };
      }
      const isEmptyItems = items == void 0 || Object.keys(items).length === 0;
      return {
        elementType: isEmptyItems ? "unknown" : this.expandSchemaObject(items, "")
      };
    } else {
      const { type, format: format2, allOf, oneOf, anyOf, enum: enums_, required, additionalProperties } = schema;
      const { properties } = schema;
      if (oneOf || anyOf) {
        return {
          name: unionType,
          types: (oneOf ?? anyOf ?? allOf).map((s) => this.expandSchemaObject(s, ""))
        };
      }
      if (allOf) {
        return {
          name: intersectionType,
          types: allOf.map(
            (schema2) => isV3ReferenceObject(schema2) ? upperCamelCase(reference2name(schema2.$ref)) : this.expandSchemaObject(schema2, "")
          )
        };
      }
      if (type === "object" && !properties) {
        return {
          typeName: "Record",
          typeArguments: ["string", "unknown"]
        };
      }
      if (additionalProperties) {
        const propertiesSchema = isV3ReferenceObject(additionalProperties) ? this.schemas[reference2name(additionalProperties.$ref)] : additionalProperties;
        if (typeof propertiesSchema !== "boolean") {
          return this.expandSchemaObject(propertiesSchema, "");
        }
      }
      if (properties && Object.keys(properties).length > 0) {
        return {
          members: Object.keys(properties).reduce((acc, propKey) => {
            const propSchema = properties[propKey];
            if (isV3ReferenceObject(propSchema)) {
              acc.push({
                name: propKey,
                type: upperCamelCase(reference2name(propSchema.$ref))
              });
            } else {
              if (propSchema.enum) {
                const name = capitalize(parentName) + capitalize(propKey);
                const preDefinedSchemaName = this.getEnum(propSchema.enum);
                if (preDefinedSchemaName) {
                  acc.push({
                    name: propKey,
                    type: name
                  });
                } else {
                  acc.push({
                    name: propKey,
                    type: {
                      name: unionType,
                      types: propSchema.type === "number" ? [...new Set(propSchema.enum)] : [...new Set(propSchema.enum)].map((v) => `"${v}"`)
                    }
                  });
                }
              } else {
                if (propSchema.in === "cookie") {
                  acc.push({
                    in: propSchema.in,
                    deprecated: propSchema.deprecated,
                    name: propKey,
                    format: propSchema.format,
                    required: propSchema.required ?? required?.includes(propKey),
                    type: this.expandSchemaObject(propSchema, propKey),
                    description: propSchema.description
                  });
                }
              }
            }
            return acc;
          }, [])
        };
      }
      if (enums_) {
        return {
          name: unionType,
          types: enums_.map((v) => `"${v}"`)
        };
      }
      return format2 ? format2type(format2) : format2type(type);
    }
  }
  expandParameterSchema(parameters) {
    const items = [];
    parameters.forEach((parameter) => {
      parameter = isV3ReferenceObject(parameter) ? this.parameters[reference2name(parameter.$ref)] : parameter;
      const { name, deprecated, schema, required, in: in_ } = parameter;
      if (schema) {
        items.push({
          name,
          in: in_,
          required: !!required,
          deprecated: !!deprecated,
          type: this.expandSchemaObject(schema, name)
        });
      }
    });
    return items;
  }
  getEnum(enumValue) {
    const enum_ = Object.values(this.enums).find(
      (value) => isSameEnum(
        value.members.map((m) => m.name),
        enumValue
      )
    );
    return enum_?.name;
  }
  analyzeApis() {
    const { paths } = this.doc;
    if (Object.keys(paths).length === 0) {
      return [];
    }
    const schemas = this.schemas;
    for (const schemaKey in schemas) {
      const schema = schemas[schemaKey];
      if (schema.properties) {
        for (const propKey in schema.properties) {
          const prop = schema.properties[propKey];
          if (!isV3ReferenceObject(prop) && prop.enum) {
            const name = capitalize(schemaKey) + capitalize(propKey);
            this.enums[name] = {
              name,
              modifier: ["export"],
              members: [...new Set(prop.enum)].map((value) => ({ name: value, type: value }))
            };
          }
        }
      }
    }
    return Object.entries(paths).reduce((acc, [path, schema]) => {
      const apiObjects = [];
      if (schema) {
        const { parameters: commonParameters = [] } = schema;
        Object.keys(import_openapi_types.OpenAPIV3.HttpMethods).forEach((method) => {
          const apiMethodObject = schema[method.toLowerCase()];
          if (apiMethodObject) {
            const methodSchema = apiMethodObject;
            const {
              summary,
              description,
              parameters = [],
              responses = {},
              deprecated,
              requestBody,
              tags = [],
              operationId
            } = methodSchema;
            commonParameters.forEach((p) => {
              if (!parameters.map((s) => isV3ReferenceObject(s) ? reference2name(s.$ref) : s.name).includes(isV3ReferenceObject(p) ? reference2name(p.$ref) : p.name)) {
                parameters.push(p);
              }
            });
            const comments = [
              summary && {
                comment: summary
              },
              description && {
                comment: description
              },
              tags.length > 0 && {
                tag: "tag",
                comment: tags.join(", ")
              },
              deprecated && {
                tag: "deprecated",
                name: "",
                comment: ""
              }
            ].filter(Boolean);
            const clientApiObject = {
              comments,
              method,
              url: path,
              name: pathToName(path, method, operationId),
              metadata: {}
            };
            if (requestBody) {
              if (isV3ReferenceObject(requestBody)) {
                clientApiObject.body = upperCamelCase(reference2name(requestBody.$ref));
              } else {
                const shouldPutInFormData = "multipart/form-data" in requestBody.content || "application/x-www-form-urlencoded" in requestBody.content;
                clientApiObject.metadata.useFormData = shouldPutInFormData;
                const type = Object.values(requestBody.content)[0].schema;
                if (isV3ReferenceObject(type)) {
                  clientApiObject.body = upperCamelCase(reference2name(type.$ref));
                } else {
                  if (type?.properties) {
                    const required = type.required;
                    Object.assign(
                      type.properties,
                      Object.keys(type.properties).reduce((acc2, propName) => {
                        const schema2 = type.properties[propName];
                        return {
                          ...acc2,
                          [propName]: {
                            ...schema2,
                            required: shouldPutInFormData || required?.includes(propName),
                            in: shouldPutInFormData ? "form-data" : "body"
                          }
                        };
                      }, {})
                    );
                  }
                  clientApiObject.body = type ? this.expandSchemaObject(type, "") : "";
                }
              }
            }
            if (parameters.length === 0) {
              clientApiObject.parameters = "";
            } else {
              clientApiObject.parameters = {
                members: this.expandParameterSchema(parameters)
              };
            }
            const mediaType = responses["200"] || responses["201"];
            if (mediaType) {
              if (isV3ReferenceObject(mediaType)) {
                clientApiObject.response = upperCamelCase(reference2name(mediaType.$ref));
              } else {
                if (mediaType.content) {
                  const shouldParseResponseToJSON = "application/json" in mediaType.content || "*/*" in mediaType.content;
                  clientApiObject.metadata.useJSONResponse = shouldParseResponseToJSON;
                  const type = ("*/*" in mediaType.content ? mediaType.content["*/*"] : "application/json" in mediaType.content ? mediaType.content["application/json"] : Object.values(mediaType.content)[0]).schema;
                  if (type) {
                    if (isV3ReferenceObject(type)) {
                      clientApiObject.response = upperCamelCase(reference2name(type.$ref));
                    } else {
                      clientApiObject.response = this.expandSchemaObject(type, "");
                    }
                  }
                } else {
                  clientApiObject.response = "";
                }
              }
            } else {
              clientApiObject.response = "";
            }
            apiObjects.push(clientApiObject);
          }
        });
      }
      return [...acc, ...apiObjects];
    }, []);
  }
  doc;
  output;
  constructor(doc, client, output) {
    this.doc = doc;
    this.client = client;
    this.output = output;
  }
  async parse() {
    const apis = this.analyzeApis();
    logger.debug(apis);
    const code = [
      this.banner,
      Object.keys(this.enums).map((enumName) => this.client.enumDeclaration(this.enums[enumName])).join("\n\n"),
      "\n\n",
      Object.keys(this.schemas).map((typeName) => {
        const schema = this.schemas[typeName];
        const typeAlias = {
          name: upperCamelCase(typeName),
          modifier: ["export"],
          type: this.expandSchemaObject(schema, typeName)
        };
        return this.client.typeDeclaration(typeAlias, true);
      }).join(";\n\n"),
      "\n\n",
      this.client.templates(apis)
    ].join("\n");
    writeToFile("output.ts", await formatCode(code)).then(() => {
    }).catch((error) => {
      logger.error(error);
    });
    return await formatCode(code);
  }
};

// src/adapters/openapi/OpenAPIV3_1.ts
init_esm_shims();
var import_openapi_types2 = __toESM(require_dist());
var logger2 = createScopedLogger("OpenAPIV3");
var OpenApiV3_1 = class {
  /** Store for enum definitions generated during parsing */
  enums = {};
  /** Client instance for code generation */
  client;
  /**
   * Returns the banner comment for generated code
   * Including version, title and description from OpenAPI doc
   */
  get banner() {
    const { info } = this.doc;
    const { version, title, description } = info;
    return this.client.comment([
      {
        comment: version
      },
      { comment: title },
      { comment: description ?? "" }
    ]);
  }
  get schemas() {
    const { components } = this.doc;
    if (components) {
      const { schemas = {}, requestBodies = {}, responses = {} } = components;
      const schemas_ = schemas;
      return {
        ...schemas,
        ...this.analyzeMediaSchemas(schemas_, requestBodies),
        ...this.analyzeMediaSchemas(schemas_, responses)
      };
    }
    return {};
  }
  get parameters() {
    const { components } = this.doc;
    if (components) {
      const { parameters = {}, headers = {} } = components;
      return {
        ...headers,
        ...parameters
      };
    }
    return {};
  }
  analyzeMediaSchemas(schemas, mediaSchemas) {
    const resolveReference = (ref) => schemas[reference2name(ref)];
    const otherSchemasWithNoReference = {};
    return Object.entries(mediaSchemas).reduce((acc, [key, schema]) => {
      key = upperCamelCase(normalizeName(key));
      if (isV3ReferenceObject(schema)) {
        return Object.assign(acc, {
          [key]: resolveReference(schema.$ref)
        });
      }
      const { content } = schema;
      if (!content) {
        return acc;
      }
      const mediaTypeSchema = ("application/json" in content ? content["application/json"] : "*/*" in content ? content["*/*"] : Object.values(content)[0]).schema;
      if (!mediaTypeSchema) {
        return acc;
      }
      if (mediaTypeSchema.$ref) {
        return Object.assign(acc, {
          [key]: resolveReference(mediaTypeSchema.$ref)
        });
      }
      return Object.assign(acc, {
        [key]: mediaTypeSchema
      });
    }, otherSchemasWithNoReference);
  }
  expandSchemaObject(schema, parentName) {
    if (isV3ReferenceObject(schema)) return upperCamelCase(reference2name(schema.$ref));
    if (isV3ArrySchemaObject(schema)) {
      const { items } = schema;
      if (isV3ReferenceObject(items)) {
        return {
          elementType: upperCamelCase(reference2name(items.$ref))
        };
      }
      const isEmptyItems = items == void 0 || Object.keys(items).length === 0;
      return {
        elementType: isEmptyItems ? "unknown" : this.expandSchemaObject(items, "")
      };
    } else {
      const { type, format: format2, allOf, oneOf, anyOf, enum: enums_, required, additionalProperties } = schema;
      const { properties } = schema;
      if (oneOf || anyOf) {
        return {
          name: unionType,
          types: (oneOf ?? anyOf ?? allOf).map((s) => this.expandSchemaObject(s, ""))
        };
      }
      if (allOf) {
        return {
          name: intersectionType,
          types: allOf.map(
            (schema2) => isV3ReferenceObject(schema2) ? upperCamelCase(reference2name(schema2.$ref)) : this.expandSchemaObject(schema2, "")
          )
        };
      }
      if (type === "object" && !properties) {
        return {
          typeName: "Record",
          typeArguments: ["string", "unknown"]
        };
      }
      if (additionalProperties) {
        const propertiesSchema = isV3ReferenceObject(additionalProperties) ? this.schemas[reference2name(additionalProperties.$ref)] : additionalProperties;
        if (typeof propertiesSchema !== "boolean") {
          return this.expandSchemaObject(propertiesSchema, "");
        }
      }
      if (properties && Object.keys(properties).length > 0) {
        return {
          members: Object.keys(properties).reduce((acc, propKey) => {
            const propSchema = properties[propKey];
            if (isV3ReferenceObject(propSchema)) {
              acc.push({
                name: propKey,
                type: upperCamelCase(reference2name(propSchema.$ref))
              });
            } else {
              if (propSchema.enum) {
                const name = capitalize(parentName) + capitalize(propKey);
                const preDefinedSchemaName = this.getEnum(propSchema.enum);
                if (preDefinedSchemaName) {
                  acc.push({
                    name: propKey,
                    type: name
                  });
                } else {
                  acc.push({
                    name: propKey,
                    type: {
                      name: unionType,
                      types: propSchema.type === "number" ? [...new Set(propSchema.enum)] : [...new Set(propSchema.enum)].map((v) => `"${v}"`)
                    }
                  });
                }
              } else {
                if (propSchema.in !== "cookie") {
                  acc.push({
                    in: propSchema.in,
                    deprecated: propSchema.deprecated,
                    name: propKey,
                    format: propSchema.format,
                    required: propSchema.required ?? (typeof required === "boolean" ? required : required?.includes(propKey)),
                    type: this.expandSchemaObject(propSchema, propKey),
                    description: propSchema.description
                  });
                }
              }
            }
            return acc;
          }, [])
        };
      }
      if (enums_) {
        return {
          name: unionType,
          types: enums_.map((v) => `"${v}"`)
        };
      }
      return format2 ? format2type(format2) : format2type(type);
    }
  }
  expandParameterSchema(parameters) {
    const items = [];
    parameters.forEach((parameter) => {
      parameter = isV3ReferenceObject(parameter) ? this.parameters[reference2name(parameter.$ref)] : parameter;
      const { name, deprecated, schema, required, in: in_ } = parameter;
      if (schema) {
        items.push({
          name,
          in: in_,
          required: !!required,
          deprecated: !!deprecated,
          type: this.expandSchemaObject(schema, name)
        });
      }
    });
    return items;
  }
  getEnum(enumValue) {
    const enum_ = Object.values(this.enums).find(
      (value) => isSameEnum(
        value.members.map((m) => m.name),
        enumValue
      )
    );
    return enum_?.name;
  }
  analyzeApis() {
    const { paths } = this.doc;
    if (!paths || Object.keys(paths).length === 0) {
      return [];
    }
    const schemas = this.schemas;
    for (const schemaKey in schemas) {
      const schema = schemas[schemaKey];
      if (schema.properties) {
        for (const propKey in schema.properties) {
          const prop = schema.properties[propKey];
          if (!isV3ReferenceObject(prop) && prop.enum) {
            const name = capitalize(schemaKey) + capitalize(propKey);
            this.enums[name] = {
              name,
              modifier: ["export"],
              members: [...new Set(prop.enum)].map((value) => ({ name: value, type: value }))
            };
          }
        }
      }
    }
    return Object.entries(paths).reduce((acc, [path, schema]) => {
      const apiObjects = [];
      if (schema) {
        const { parameters: commonParameters = [] } = schema;
        Object.keys(import_openapi_types2.OpenAPIV3.HttpMethods).forEach((method) => {
          const apiMethodObject = schema[method.toLowerCase()];
          if (apiMethodObject) {
            const methodSchema = apiMethodObject;
            const {
              summary,
              description,
              parameters = [],
              responses = {},
              deprecated,
              requestBody,
              tags = [],
              operationId
            } = methodSchema;
            commonParameters.forEach((p) => {
              if (!parameters.map((s) => isV3ReferenceObject(s) ? reference2name(s.$ref) : s.name).includes(isV3ReferenceObject(p) ? reference2name(p.$ref) : p.name)) {
                parameters.push(p);
              }
            });
            const comments = [
              summary && {
                comment: summary
              },
              description && {
                comment: description
              },
              tags.length > 0 && {
                tag: "tag",
                comment: tags.join(", ")
              },
              deprecated && {
                tag: "deprecated",
                name: "",
                comment: ""
              }
            ].filter(Boolean);
            const clientApiObject = {
              comments,
              method,
              url: path,
              name: pathToName(path, method, operationId),
              metadata: {}
            };
            if (requestBody) {
              if (isV3ReferenceObject(requestBody)) {
                clientApiObject.body = upperCamelCase(reference2name(requestBody.$ref));
              } else {
                const shouldPutInFormData = "multipart/form-data" in requestBody.content || "application/x-www-form-urlencoded" in requestBody.content;
                clientApiObject.metadata.useFormData = shouldPutInFormData;
                const type = Object.values(requestBody.content)[0].schema;
                if (isV3ReferenceObject(type)) {
                  clientApiObject.body = upperCamelCase(reference2name(type.$ref));
                } else {
                  if (type?.properties) {
                    const required = type.required;
                    Object.assign(
                      type.properties,
                      Object.keys(type.properties).reduce((acc2, propName) => {
                        const schema2 = type.properties[propName];
                        return {
                          ...acc2,
                          [propName]: {
                            ...schema2,
                            required: shouldPutInFormData || required?.includes(propName),
                            in: shouldPutInFormData ? "form-data" : "body"
                          }
                        };
                      }, {})
                    );
                  }
                  clientApiObject.body = type ? this.expandSchemaObject(type, "") : "";
                }
              }
            }
            const parameters_ = parameters.filter((p) => isV3_1ReferenceObject(p) ? true : p.in !== "cookie");
            if (parameters_.length === 0) {
              clientApiObject.parameters = "";
            } else {
              clientApiObject.parameters = {
                members: this.expandParameterSchema(parameters_)
              };
            }
            const mediaType = responses["200"] || responses["201"];
            if (mediaType) {
              if (isV3ReferenceObject(mediaType)) {
                clientApiObject.response = upperCamelCase(reference2name(mediaType.$ref));
              } else {
                if (mediaType.content) {
                  const shouldParseResponseToJSON = "application/json" in mediaType.content || "*/*" in mediaType.content;
                  clientApiObject.metadata.useJSONResponse = shouldParseResponseToJSON;
                  const type = ("*/*" in mediaType.content ? mediaType.content["*/*"] : "application/json" in mediaType.content ? mediaType.content["application/json"] : Object.values(mediaType.content)[0]).schema;
                  if (type) {
                    if (isV3ReferenceObject(type)) {
                      clientApiObject.response = upperCamelCase(reference2name(type.$ref));
                    } else {
                      clientApiObject.response = this.expandSchemaObject(type, "");
                    }
                  }
                } else {
                  clientApiObject.response = "";
                }
              }
            } else {
              clientApiObject.response = "";
            }
            apiObjects.push(clientApiObject);
          }
        });
      }
      return [...acc, ...apiObjects];
    }, []);
  }
  doc;
  output;
  constructor(doc, client, output) {
    this.doc = doc;
    this.client = client;
    this.output = output;
  }
  async parse() {
    const apis = this.analyzeApis();
    logger2.debug(apis);
    const code = [
      this.banner,
      Object.keys(this.enums).map((enumName) => this.client.enumDeclaration(this.enums[enumName])).join("\n\n"),
      "\n\n",
      Object.keys(this.schemas).map((typeName) => {
        const schema = this.schemas[typeName];
        const typeAlias = {
          name: upperCamelCase(typeName),
          modifier: ["export"],
          type: this.expandSchemaObject(schema, typeName)
        };
        return this.client.typeDeclaration(typeAlias, true);
      }).join(";\n\n"),
      "\n\n",
      this.client.templates(apis)
    ].join("\n");
    writeToFile("output.ts", await formatCode(code)).then(() => {
    }).catch((error) => {
      logger2.error(error);
    });
    return await formatCode(code);
  }
};

// src/client/AxiosClient.ts
init_esm_shims();

// src/generators/Generator.ts
init_esm_shims();
var CodeGen = class {
  toURL(client) {
    let { url } = client;
    const { parameters } = client;
    const inQueryParameters = isTypeLiteral(parameters) && parameters.members.filter((m) => m.in === "query");
    url = url.replaceAll("{", "${");
    const patchURL = inQueryParameters ? url + (inQueryParameters.length > 0 ? "?" + inQueryParameters.map((m) => `${m.name}=\${encodeURIComponent(String(${camelCase(m.name)}))}`).join("&") : "") : url;
    return patchURL;
  }
  toFormData(api) {
    const { parameters, body, metadata } = api;
    if (!metadata.useFormData) return "";
    if (body && isTypeLiteral(body)) {
      const formDataFields = body.members.filter((p) => p.in === "form-data");
      if (formDataFields.length === 0) {
        return "";
      }
      return [
        "const fd = new FormData()",
        ...formDataFields.map((f) => {
          if (isArrayType(f.type) && f.type.elementType === "File") {
            return `
              for (const file of ${f.name}) {
                fd.append('${f.name}[]', file, file.name);
              }
            `;
          }
          return `fd.append("${f.name}", ${f.format === "binary" || f.format === "string" ? f.name : `String(${camelCase(f.name)})`})`;
        })
      ].join("\n");
    }
    if (parameters && isTypeLiteral(parameters)) {
      const formDataFields = parameters.members.filter((p) => p.in === "form-data");
      if (formDataFields.length === 0) {
        return "";
      }
      return [
        "const fd = new FormData()",
        ...formDataFields.map((f) => `fd.append("${f.name}", ${camelCase(f.name)})`)
      ].join("\n");
    }
    return "";
  }
  toFunction(api, client) {
    const { name, parameters, body } = api;
    const fnName = name;
    const args = () => {
      if (!parameters && !body) return "";
      return [
        parameters ? `${this.toCode(parameters)}: ${this.toTypeDeclaration(parameters)}` : "",
        body ? `${this.toCode(body)} : ${this.toTypeDeclaration(body)}` : ""
      ].filter(Boolean).join(",");
    };
    const fn = () => {
      return [`export async function ${fnName}(${args()}) {`, client.fnBody(api), `}`].join("");
    };
    const code = [
      // For debug use
      `${fnName}.displayName = "${fnName}"`,
      fn()
    ];
    return code.join("\n");
  }
  comment(comments) {
    const strs = ["/**"];
    const maxLength = comments.map(({ tag, name }) => {
      return tag && name ? `@${tag} ${name}  `.length : 0;
    }).sort((a, b) => a > b ? -1 : 0)[0];
    comments.forEach(({ tag, name, comment }) => {
      if (!tag || !name) {
        strs.push(` * ${comment}`);
      } else {
        const comment_ = `@${tag} ${name}`;
        const extraSpace = maxLength - comment_.length;
        strs.push(` * @${tag} ${name + Array(extraSpace).fill("").join(" ")} - ${comment}`);
      }
    });
    strs.push(" */");
    return strs.join("\n");
  }
  toCode(type) {
    if (!type) return "";
    if (typeof type === "string") {
      return type.toLowerCase();
    }
    if (isTypeParameter(type)) {
      return type.name.toLowerCase();
    }
    if (isTypeReference(type)) {
      return type.typeName.toLowerCase();
    }
    if (isUnionType(type) || isIntersectionType(type) || isArrayType(type)) {
      return "req";
    }
    const { members } = type;
    if (members.length === 0) {
      return "{}";
    }
    return [
      "{",
      ...members.map((t) => {
        const { initializer, name } = t;
        if (t.in === "cookie") return "";
        const safeName = camelCase(normalizeName(name));
        return initializer ? `${name}: ${typeof initializer === "string" ? initializer : this.toCode(initializer)},` : `${safeName},`;
      }).filter(Boolean),
      "}"
    ].filter(Boolean).join("");
  }
  toTypeDeclaration(type, showComments = false) {
    if (type == void 0) return "unknown";
    if (typeof type === "string" || typeof type === "number") {
      return type;
    }
    if (isTypeParameter(type)) {
      return type.name;
    }
    if (isTypeReference(type)) {
      return this.toTypeReferenceDeclaration(type);
    }
    if (isUnionType(type)) {
      return this.toUnionTypeDeclaration(type);
    }
    if (isIntersectionType(type)) {
      return this.toIntersectionTypeDeclaration(type);
    }
    if (isArrayType(type)) {
      return this.toArrayTypeDeclaration(type);
    }
    const { members } = type;
    if (!members || members.length === 0) {
      return "{}";
    }
    return [
      "{",
      members.map((t) => {
        if (t.in === "cookie") return "";
        return [
          showComments && t.description ? `/** @description ${t.description} */
` : "",
          `"${camelCase(normalizeName(t.name))}"`,
          t.required === true || t.in === "header" ? "" : "?",
          ":",
          this.toTypeDeclaration(t.type),
          ";\n"
        ].filter(Boolean).join("");
      }).join(""),
      "}"
    ].filter(Boolean).join("");
  }
  toTypeReferenceDeclaration(typeReference) {
    const { typeName, typeArguments } = typeReference;
    if (!typeArguments) {
      return typeName;
    }
    return `${typeName}<${typeArguments.map((t) => this.toTypeDeclaration(t)).join(" ,")}>`;
  }
  toUnionTypeDeclaration(type) {
    const { types, name } = type;
    if (name !== unionType) {
      return "";
    }
    return types.map((t) => this.toTypeDeclaration(t)).join("|");
  }
  toIntersectionTypeDeclaration(type) {
    const { types, name } = type;
    if (name !== intersectionType) {
      return "";
    }
    return types.map((t) => this.toTypeDeclaration(t)).join("&");
  }
  toArrayTypeDeclaration(type) {
    const { elementType } = type;
    return `(${this.toTypeDeclaration(elementType)})[]`;
  }
  toEnumDeclaration(type) {
    const { members } = type;
    return [
      "{",
      members.map((t) => {
        if (!t.type) {
          return t.name === "" ? `"" = ""` : t.name;
        } else {
          return `${normalizeName(t.name)} = "${t.type}"`;
        }
      }),
      "}"
    ].join("\n");
  }
  typeDeclaration(typeAlias, showComments = false) {
    const { name, modifier = [], type } = typeAlias;
    return `${modifier.join(" ")} type ${name} = ${this.toTypeDeclaration(type, showComments)}`;
  }
  interfaceDeclaration(typeAlias) {
    const { name, modifier = [], type } = typeAlias;
    return `${modifier.join(" ")} interface ${name} ${this.toTypeDeclaration(type)}`;
  }
  enumDeclaration(enumAlias) {
    const { name, modifier = [] } = enumAlias;
    return `${modifier.join(" ")} enum ${name} ${this.toEnumDeclaration(enumAlias)}`;
  }
};

// src/client/AxiosClient.ts
var AxiosClient = class extends CodeGen {
  fnBody(apis) {
    throw new Error("Method not implemented.");
  }
  code = "";
  clientName = "axios";
  clientInfos = [];
  templates(apis) {
    return "";
  }
};

// src/client/FetchClient.ts
init_esm_shims();
var FetchClient = class extends CodeGen {
  code = "";
  clientName = "fetch";
  clientInfos = [];
  fnBody(api) {
    const { parameters, method, body, metadata, response } = api;
    const args = () => {
      if (!parameters && !body) return "";
      const objectLiterals = {
        members: [
          {
            name: "method",
            initializer: `"${method.toUpperCase()}"`
          }
        ]
      };
      if (body) {
        objectLiterals.members.push({
          name: "body",
          initializer: metadata.useFormData ? isTypeLiteral(body) ? "fd" : this.toCode(body) : `JSON.stringify(${this.toCode(body)})`
        });
      }
      if (isTypeLiteral(parameters)) {
        const headers = parameters.members.filter((p) => p.in === "header");
        const bodies = parameters.members.filter((p) => p.in === "body" || !p.in);
        if (headers.length > 0) {
          objectLiterals.members.push({
            name: "headers",
            initializer: {
              members: headers.map(
                (h) => ({
                  name: h.name,
                  initializer: h.format !== "string" ? `encodeURIComponent(JSON.stringify(${camelCase(normalizeName(h.name))}))` : `encodeURIComponent(${camelCase(normalizeName(h.name))})`
                })
              )
            }
          });
        }
        if (!body && bodies.length > 0) {
          objectLiterals.members.push({
            name: "body",
            initializer: metadata.useFormData ? "fd" : `JSON.stringify(${this.toCode({
              members: bodies.map(
                (b) => ({
                  name: b.name
                })
              )
            })})`
          });
        }
      }
      return this.toCode(objectLiterals);
    };
    const code = [
      this.toFormData(api),
      //
      "\n",
      "return",
      `${this.clientName}(`,
      `\`${this.toURL(api)}\`,`,
      args(),
      ")",
      metadata.useJSONResponse && response ? `.then(async (resp) => await resp.json() as ${this.toTypeDeclaration(response)})` : ""
    ];
    return code.join(" ");
  }
  template(api) {
    return this.toFunction(api, this);
  }
  templates(apis) {
    const code = apis.map((api) => this.template(api)).join("\n\n");
    return code;
  }
};

// src/types/client.ts
init_esm_shims();

// src/utils/getApiDoc.ts
init_esm_shims();
var agent = new Agent({
  connect: {
    rejectUnauthorized: false
  }
});
setGlobalDispatcher(agent);
function getOpenApiDocVersion(doc) {
  const version = (doc.openapi || doc.swagger).slice(0, 3);
  switch (version) {
    case "2.0":
      return 0 /* v2 */;
    case "3.0":
      return 1 /* v3 */;
    case "3.1":
      return 2 /* v3_1 */;
    default:
      console.error(`Unknown openai version ${version}`);
      process.exit(1);
  }
}
async function getApiDoc(docURL) {
  console.info(`Get API Document from ${docURL}`);
  return fetch(docURL, { method: "GET" }).then(async (resp) => {
    return await resp.json();
  });
}

// src/index.ts
var codeGenByConfig = async (doc, output) => {
  const version = getOpenApiDocVersion(doc);
  const client = new FetchClient();
  switch (version) {
    case 0 /* v2 */:
      await new OpenApiV2().parse();
      break;
    case 1 /* v3 */:
      await new OpenApiV3(doc, client, output).parse();
      break;
    case 2 /* v3_1 */:
      await new OpenApiV3_1(doc, client, output).parse();
      break;
  }
};
async function codeGen(options, output) {
  if (!options.doc) {
    console.error(`Missing openapi doc url`);
    process.exit(1);
  }
  const doc = await getApiDoc(options.doc);
  const version = getOpenApiDocVersion(doc);
  const client = (() => {
    switch (options.client) {
      case 0 /* Axios */:
        return new AxiosClient();
      default:
        return new FetchClient();
    }
  })();
  switch (version) {
    case 0 /* v2 */:
      await new OpenApiV2().parse();
      break;
    case 1 /* v3 */:
      await new OpenApiV3(doc, client, output).parse();
      break;
    case 2 /* v3_1 */:
      await new OpenApiV3_1(doc, client, output).parse();
      break;
  }
}

export { codeGenByConfig, codeGen as default };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map