export function concatParamsStr(obj: any) {
  let result = '';
  let item;
  for (item in obj) {
    if (obj[item] && String(obj[item])) {
      result += `&${item}=${encodeURIComponent(obj[item])}`;
    }
  }
  if (result) {
    result = '&' + result.slice(1);
  }
  return result;
}


