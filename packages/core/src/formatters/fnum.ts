export const fnum = (num: number, dec = 2): string => {
  let suffix = "";
  while (num > 10 ** 3) {
    num /= 10 ** 3;
    suffix += "k";
  }
  return `${Math.round(num * 10 ** dec) / 10 ** dec}${suffix}`;
};
