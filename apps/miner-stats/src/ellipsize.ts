export function ellipsize(text: string, length = 4) {
  if (text.length > length) {
    return `${text.substring(0, length)}...${text.substring(text.length - length)}`;
  }
}
