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

function generateRandomisedRGBAStrings(color) {
  const generatedColors = [];
  // Keeping this here so it is constant throughout the rest of the code.
  const gradientStep = 15;
  for (let r = 0; r < 3; r++) {
    for (let g = 0; g < 3; g++) {
      for (let b = 0; b < 3; b++) {
        const newR = color.r - gradientStep * r;
        const newG = color.g - gradientStep * g;
        const newB = color.b - gradientStep * b;
        generatedColors.push(RGBAToString({ r: newR, g: newG, b: newB, a: 1 }));
      }
    }
  }
  return generatedColors;
}

export { randomiseRGBA, RGBAToString, generateRandomisedRGBAStrings };
