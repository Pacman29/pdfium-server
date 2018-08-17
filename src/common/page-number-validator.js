export function pageNumberValidator(str) {
  let result = null;
  if (str.match(/^\d*$/)) {
    result = Number(str);
  } else {
    throw new Error('is page number');
  }

  return result;
}
