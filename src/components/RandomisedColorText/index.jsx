import { RGBAToString, randomiseRGBA } from '../../rgba';

export default function RandomisedColorText({ color, text }) {
  return (
    <>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{ color: `${RGBAToString(randomiseRGBA(color))}` }}
        >
          {char}
        </span>
      ))}
    </>
  );
}
