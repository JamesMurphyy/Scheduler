import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";

//Defining the InterviewerListItem and displays the avatar of the interviewer and, when selected, their name.
export default function InterviewerListItem(props) {

  //The InterviewerClass changes depending on if the interviewer has been selected
  const InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li onClick={props.setInterviewer} className={InterviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};