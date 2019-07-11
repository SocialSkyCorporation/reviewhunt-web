export function numberWithCommas(x) {
  
  if (Number.parseFloat(x) < 1) {
    return x;
  }

  let str = x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .split(".");
  if (str.length > 1) {
    str[1] = str[1].replace(/,/g, "");
    str.join(".");
  } else {
    str = str[0];
  }

  return str;
}
