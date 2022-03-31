import React from 'react';
import "components/Appointment/styles.scss";

//Defining Empty Component
//Showing an image with an onClick function that triggers the onAdd property.

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};