import React from 'react';
import "components/Appointment/styles.scss";

//Defining the Status function which shows a message and looping image (used when deleting and saving appointments)

export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  )
};