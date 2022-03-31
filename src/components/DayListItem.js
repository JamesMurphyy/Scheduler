import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

//Defining the DayListItem function(Component) that is used for each day of the week.
//This function is utilized as a format for each day -- displaying its information and is altered depending on the day name within the DayList function.

export default function DayListItem(props) {

  //Formatting the spots display message depending on  how many spots are remaining.
  function formatSpots(value) {
    if (value === 1) {
      return "1 spot remaining"
    } else if (value === 0) {
      return "no spots remaining"
    } else {
      return `${value} spots remaining`
    }
  };

  //dayListClass triggers a certain class depending on certain terms (ex. if the day has been selected -- 
  //giving it a new class OR if there are no spots left then that would give the day a different class as well)

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
};