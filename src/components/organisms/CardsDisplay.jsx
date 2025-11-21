import React from "react";
import DynamicTexts from "../molecules/DynamicTexts";
import ImageAtom from "../atoms/ImageAtom";

function CardsDisplay({ content = [], className = "", isCardList = false }) {
  return (
    <div className={`cards-display-container ${className}`}>
      <div className={isCardList ? "cards-list-layout" : "cards-grid-layout"}>
        {content.map((item, index) => (
          <div
            key={index}
            className={isCardList ? "card-list-item" : "card-grid-item"}
          >
            {item.card.map((element, idx) => {
              if (element.type === "image") {
                return (
                  <ImageAtom
                    key={idx}
                    src={element.src}
                    alt={element.alt}
                    className={
                      isCardList ? "card-list-image" : element.className
                    }
                  />
                );
              }
              if (element.type === "text") {
                return (
                  <DynamicTexts
                    key={idx}
                    Texts={[element]}
                    className={isCardList ? "card-list-text" : ""}
                  />
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsDisplay;