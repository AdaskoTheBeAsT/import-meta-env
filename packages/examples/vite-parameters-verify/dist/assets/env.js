const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
function parse(src) {
  const obj = {};
  let lines = src.toString();
  lines = lines.replace(/\r\n?/mg, "\n");
  let match;
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1];
    let value = match[2] || "";
    value = value.trim();
    const maybeQuote = value[0];
    value = value.replace(/^(['"])([\s\S]+)\1$/mg, "$2");
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, "\n");
      value = value.replace(/\\r/g, "\r");
    }
    obj[key] = value;
  }
  return obj;
}
const e = parse(`VITE_NAME=vite-plugin-dotenv
`);
function verify(actual) {
  const expected = { "VITE_NAME": "" };
  const importMetaEnv = "import.meta.env";
  const missingKeys = [];
  Object.keys(expected).forEach((key) => {
    if (Object.hasOwnProperty.call(actual, key) === false) {
      missingKeys.push(JSON.stringify(key));
    }
  });
  if (missingKeys.length) {
    throw new Error(`[vite-plugin-dotenv]: The following variables were defined in ${importMetaEnv} but are not present in the environment: ` + missingKeys.join(", "));
  }
  const notExistsKeys = [];
  Object.keys(actual).forEach((key) => {
    if (Object.hasOwnProperty.call(expected, key) === false) {
      notExistsKeys.push(JSON.stringify(key));
    }
  });
  if (notExistsKeys.length) {
    throw new Error(`[vite-plugin-dotenv]: The following variables were NOT defined in ${importMetaEnv} but are present in the environment: ` + notExistsKeys.join(", "));
  }
}
verify(e);
var vite_plugin_dotenv_unique_id_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx = Object.assign(e, { "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true });
export { vite_plugin_dotenv_unique_id_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx as v };
