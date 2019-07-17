export function numberWithCommas(x) {
  if (Number.parseFloat(x) < 1000) {
    return x;
  }

  let str = x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .split(".");
    
  if (str.length > 1) {
    console.log(str);
    str[1] = str[1].replace(/,/g, "");
    str = str.join(".");
  } else {
    str = str[0];
  }

  return str;
}
