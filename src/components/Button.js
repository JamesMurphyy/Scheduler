import React from "react";
import classNames from "classnames";
import "components/Button.scss";

//Defining the button function that is used throughout the project within many components.

export default function Button(props) {
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
};
