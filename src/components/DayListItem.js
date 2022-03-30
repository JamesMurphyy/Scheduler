import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  function formatSpots(value) {
    if (value === 1) {
      return "1 spot remaining"
    } else if (value === 0) {
      return "no spots remaining"
    } else {
      return `${value} spots remaining`
    }
  }

  const dayListClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    <li className={dayListClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}