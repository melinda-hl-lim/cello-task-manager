import React from "react";
import Popover from "../shared/Popover";
import DueDatePicker from "./DueDatePicker";
import Labels from "./Labels";

const CardPopover = ({ type, attachedTo, card }) => {
  let child;

  switch (type) {
    case "labels":
      child = <Labels labels={card.labels} />;
      break;
    case "due-date":
      child = <DueDatePicker card={card} />;
      break;
  }

  return (
    <Popover type={type} visible={!!type} attachedTo={attachedTo}>
      {child}
    </Popover>
  );
};

export default CardPopover;
