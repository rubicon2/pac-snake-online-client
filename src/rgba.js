function randomiseRGBA(color) {
  return {
    r: color.r * Math.max(Math.random(), 0.8),
    g: color.g * Math.max(Math.random(), 0.8),
    b: color.b * Math.max(Math.random(), 0.8),
    a: Math.max(Math.random(), 0.8),
  };
}

function RGBAToString(color) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

export { randomiseRGBA, RGBAToString };
