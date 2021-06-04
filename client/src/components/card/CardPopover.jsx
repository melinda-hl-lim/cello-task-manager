import React from "react";
import Popover from "../shared/Popover";
import DueDatePicker from "./DueDatePicker";
import Labels from "./Labels";
import MoveCard from "./MoveCard";

const CardPopover = ({ type, attachedTo, card, onClose }) => {
  let child;

  switch (type) {
    case "labels":
      child = <Labels card={card} onClose={onClose}/>;
      break;
    case "due-date":
      child = <DueDatePicker card={card} onClose={onClose}/>;
      break;
    case "move-card":
      child = <MoveCard card={card} onClose={onClose}/>;
      break;
  }

  return (
    <Popover type={type} visible={!!type} attachedTo={attachedTo}>
      {child}
    </Popover>
  );
};

export default CardPopover;
