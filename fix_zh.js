const fs = require("fs");
const raw = fs.readFileSync("messages/zh.json", "utf8");

// State-machine walk: fix unescaped double-quotes that appear inside string values
let out = "";
let inString = false;
let escape = false;
let isKey = true;   // tracks whether this string is a key or a value
let depth = 0;      // object/array depth

for (let i = 0; i < raw.length; i++) {
  const ch = raw[i];

  if (escape) {
    out += ch;
    escape = false;
    continue;
  }

  if (ch === "\\") {
    escape = true;
    out += ch;
    continue;
  }

  if (inString) {
    if (ch === '"') {
      // This closes the string
      inString = false;
      out += ch;
      continue;
    }
    out += ch;
    continue;
  }

  // Not inside a string
  if (ch === '"') {
    inString = true;
    out += ch;
    continue;
  }

  out += ch;
}

// Now do a simpler targeted fix instead:
// Find body/heading/lastUpdated value strings and escape any interior " that are not already escaped
// Strategy: for each instance of ": "...content..." we repair interior bare "
// Use regex to find each JSON string value and escape unescaped interior quotes
let fixed = raw;
// Replace unescaped " that are inside string values
// Pattern: after the opening " of a value (preceded by ": "), find the content up to the 
// matching closing " and escape any bare " in content.
// Simpler: walk char by char with state tracking

let result = "";
let ins = false;
let esc = false;
let pos = 0;
const src = raw;

while (pos < src.length) {
  const c = src[pos];

  if (esc) {
    result += c;
    esc = false;
    pos++;
    continue;
  }

  if (c === "\\") {
    esc = true;
    result += c;
    pos++;
    continue;
  }

  if (!ins) {
    if (c === '"') {
      // Starting a string - look ahead to determine if it"s a key or value
      // For our purposes, flag if we are about to enter a VALUE string
      // (we detect by checking if previous non-space char was : or [ or ,)
      // Actually: mark string start, then check for interior bare quotes
      ins = true;
      result += c;
      pos++;
      continue;
    }
    result += c;
    pos++;
    continue;
  }

  // Inside string
  if (c === '"') {
    // Check if this is really the end of the string or an unescaped interior quote
    // Look ahead: after this quote, skip whitespace, then expect : } ] ,
    let j = pos + 1;
    while (j < src.length && (src[j] === " " || src[j] === "\t" || src[j] === "\r" || src[j] === "\n")) j++;
    const next = src[j];
    if (next === ":" || next === "}" || next === "]" || next === ",") {
      // Legitimate end of string
      ins = false;
      result += c;
    } else {
      // Interior unescaped quote - escape it
      result += '\\"';
    }
    pos++;
    continue;
  }

  result += c;
  pos++;
}

fs.writeFileSync("messages/zh.json", result, "utf8");
console.log("Fixed zh.json written. Bytes before:", raw.length, "after:", result.length);
