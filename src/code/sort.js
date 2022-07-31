import fs from 'fuzzysort';

export function fuzzysort(arr, text) {
  if (!text) {
    return arr;
  }
  return fs.go(text, arr).map(o => o.target);
}
