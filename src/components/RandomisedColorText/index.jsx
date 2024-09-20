import { useState, useEffect } from 'react';
import { RGBAToString, generateRandomisedRGBAStrings } from '../../rgba';

export default function RandomisedColorText({ color, text }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(generateRandomisedRGBAStrings(color));
  }, [RGBAToString(color)]);

  return (
    <>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{
            color: `${colors[Math.floor((colors.length - 1) * Math.random())]}`,
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}
