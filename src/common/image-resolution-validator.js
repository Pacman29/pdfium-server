export function imageResolutionValidator(str) {
  let result = null;
  if (str.match(/^\d$/)) {
    result = str;
  } else {
    throw new Error('is not imageResolution resolution');
  }

  return result;
}
