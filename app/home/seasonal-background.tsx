import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

import christmasOne from "../../public/images/christmas-corner-1.png";
import christmasTwo from "../../public/images/christmas-corner-2.png";
import christmasThree from "../../public/images/christmas-corner-3.png";
import webOne from "../../public/images/halloween-web-1.png";
import webTwo from "../../public/images/halloween-web-2.png";
import webThree from "../../public/images/halloween-web-3.png";

const webAssets: StaticImageData[] = [webOne, webTwo, webThree, webTwo, webOne, webThree];
const christmasAssets: StaticImageData[] = [
  christmasOne,
  christmasThree,
  christmasTwo,
  christmasOne,
  christmasThree,
];

export function HalloweenBackground() {
  return (
    <div className="halloween-background" aria-hidden="true">
      {webAssets.map((source, index) => (
        <Image
          alt=""
          className={`landing-cobweb web-${index + 1}`}
          draggable={false}
          key={`${source.src}-${index}`}
          sizes="(max-width: 600px) 220px, 340px"
          src={source}
        />
      ))}
    </div>
  );
}

export function HalloweenTreats() {
  const treats = [
    "🍬", // Caramelo
    "🍭", // Chupeta
    "🍫", // Chocolate
    "🍪", // Galleta
    "🍩", // Dona
    "🧁", // Cupcake
    "🍦", // Helado
    "🍧", // Granizado
    "🍮", // Flan
    "🍯", // Miel
    "🥧", // Pie
    "🥨", // Pretzel
    "🍡", // Dango
    "🍥", // Pastel japonés
  ];

  return (
    <div className="halloween-treats" aria-hidden="true">
      {treats.map((treat, index) => {
        const style = {
          "--treat-delay": `${-((index * 2.9) % 17)}s`,
          "--treat-duration": `${13 + ((index * 5) % 7)}s`,
          "--treat-left": `${7 + ((index * 31) % 87)}%`,
          "--treat-size": `${17 + ((index * 7) % 13)}px`,
          "--treat-sway": `${-28 + ((index * 17) % 57)}px`,
          "--treat-top": `${8 + ((index * 23) % 82)}%`,
        } as CSSProperties;

        return (
          <span key={`${treat}-${index}`} style={style}>
            {treat}
          </span>
        );
      })}
    </div>
  );
}

export function ChristmasBackground() {
  return (
    <div className="christmas-background" aria-hidden="true">
      {christmasAssets.map((source, index) => (
        <Image
          alt=""
          className={`christmas-corner christmas-corner-${index + 1}`}
          draggable={false}
          key={`${source.src}-${index}`}
          sizes="(max-width: 600px) 240px, 390px"
          src={source}
        />
      ))}
    </div>
  );
}

export function ChristmasSnow() {
  return (
    <div className="christmas-snow" aria-hidden="true">
      {Array.from({ length: 34 }, (_, index) => {
        const style = {
          "--snow-delay": `${-((index * 1.7) % 13)}s`,
          "--snow-duration": `${9 + ((index * 7) % 10)}s`,
          "--snow-left": `${(index * 37) % 101}%`,
          "--snow-size": `${6 + ((index * 5) % 11)}px`,
          "--snow-sway": `${-32 + ((index * 19) % 65)}px`,
        } as CSSProperties;

        return (
          <span key={index} style={style}>
            {index % 4 === 0 ? "❄" : "•"}
          </span>
        );
      })}
    </div>
  );
}
