export function kebabRules(key: string): string {
  if (key.charAt(0) !== '-') {
    // @todo(keco): worth hoisting RegExp?
    return key.replace(/([A-Z])/g, '-$1').toLowerCase();
  } else {
    return key;
  }
}
