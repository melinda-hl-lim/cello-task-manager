import React from "react";
import Popover from "../shared/Popover";
import DueDatePicker from "./DueDatePicker";
import Labels from "./Labels";

const CardPopover = ({ type, attachedTo, card, onClose }) => {
  let child;

  switch (type) {
    case "labels":
      child = <Labels labels={card.labels} onClose={onClose}/>;
      break;
    case "due-date":
      child = <DueDatePicker card={card} onClose={onClose}/>;
      break;
  }

  return (
    <Popover type={type} visible={!!type} attachedTo={attachedTo}>
      {child}
    </Popover>
  );
};

export default CardPopover;
