export const fnum = (num: number, dec = 2): string => {
  let suffix = "";
  if (num > 10 ** 6) {
    num = num / 10 ** 6;
    suffix = "kk";
  } else if (num > 10 ** 3) {
    num = num / 1000;
    suffix = "k";
  }
  return `${Math.round(num * 10 ** dec) / 10 ** dec}${suffix}`;
};
