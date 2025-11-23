import React from "react";
import DynamicTexts from "../molecules/DynamicTexts";
import ImageAtom from "../atoms/ImageAtom";
import CardsDisplay from "../organisms/CardsDisplay";

function Section({ content = [], className }) {
  return (
    <div className={className}>
      {content.map((item, index) => {
        if (item.type === "text") {
          return (
            <DynamicTexts key={index}  Texts={item.text}  className={item.className} />
          );
        }

        if (item.type === "image") {
          return (
            <ImageAtom
              key={index}
              src={item.src}
              alt={item.alt}
              className={item.className}
            />
          );
        }

        if (item.type === "cards" || item.type === "cardList") {
          return (
            <CardsDisplay
              key={index}
              content={item.cards}
              isCardList={item.type === "cardList"}
              className={item.className}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

export default Section;
