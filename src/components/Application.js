import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";

//Defining Application function which displays all the information regarding the static webpage -- Displays the dayLists and the Appointments that have been
//made for each day -- allowing the user to click through each day and, in real-time, see what appointment slots have been booked/not booked.

export default function Application(props) {
  //Deconstructing functions and variables from the useApplicationData page (made a hook to increase code readability)  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    dailyAppointments,
    getInterview,
    getInterviewersForDay
  } = useApplicationData();

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview)
          const interviewers = getInterviewersForDay(state, state.day)
          return (
            <Appointment
              key={appointment.id}
              {...appointment}
              interview={interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          )
        }
        )}
        <Appointment key={"last"} time={"5pm"} />
      </section>
    </main>
  );
}
