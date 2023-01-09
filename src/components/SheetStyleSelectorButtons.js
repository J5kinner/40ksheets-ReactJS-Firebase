import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function SheetStyleSelectorButtons({ radioValue, onChange, radios }) {
  return (
    <>
    <div className="sheet-type">
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-primary" : "outline-light"}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={onChange}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      </div>
    </>
  );
}

export default SheetStyleSelectorButtons;
