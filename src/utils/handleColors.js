export const colorsArray = Array.from({ length: 121 }, (_, index) => {
  if (index < 11) {
    const lightness = 100 - index * 10;
    return `hsl(0, 0%, ${lightness}%)`;
  }

  return `hsl(${((index - 10) * 3) % 360}, 100%, 50%)`;
});

export const hslToHsla = (hslColor, alpha) => {
  const regex = /hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/;

  const matches = hslColor.match(regex);

  if (matches) {
    const h = parseInt(matches[1], 10);
    const s = parseInt(matches[2], 10);
    const l = parseInt(matches[3], 10);

    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  }
};
