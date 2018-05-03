export default function stringLimit(str, limit = 42, endsWith = "...") {
  if (str.length > limit) {
    let res = str.slice(0, limit) + endsWith;
    return res;
  } else {
    return str;
  }
}
