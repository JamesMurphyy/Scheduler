import { useState, useEffect } from 'react';
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


//Hook made to clean up code in other file -- Application.js --

export default function useApplicationData() {

  //Makes states for all of the properties that are required for Application.js file.
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //Function from helpers folder that gets the certain appointments for the day that has been selected.
  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);

  //Sets the day as the day that has been selected.
  const setDay = day => setState({ ...state, day });

  //useEffect used alongside a Promise.all feature that utilizes axios.get from the active database (api requests), and when completed, stores the information through states.
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  //Update spots function that is triggered whenever a user adds or deletes an appointment. (Updates the spots under each day without having to reload the webpage/crash/reset the page).
  const updateSpots = function (state, id) {
    //Finding the day that is current and the one that will be updated
    const currentDay = state.days.find((day) => day.appointments.includes(id));
    //Finding appointments that are null (falsy)
    const nullAppointments = currentDay.appointments.filter(id => !state.appointments[id].interview);
    const spots = nullAppointments.length;
    //Making a newDay with the newly updated spots value
    const newDay = { ...currentDay, spots };
    //Checking to impliment the newDay value, just making a new array (map function) and updating the day if the name is correct (updating the spots value)
    const newDays = state.days.map((day) => day.name === state.day ? newDay : day);
    //Setting the state with the newly added days following the map function
    setState({ ...state, days: newDays });
    return newDays;
  };

  //bookInterview function used to set the state of the appointments and interviews, that sends a put request through axios updating the information and also triggering an update to
  //the updateSpots function mentioned above. 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const updateState = ({
      ...state,
      appointments
    });
    return axios.put(`/api/appointments/${id}`, { interview }).then(response => {
      updateSpots(updateState, id);
    });
  };

  //cancelInterview function used to set the state of the appointments and interviews, that sends a put request through axios updating the information and also triggering an update to
  //the updateSpots function mentioned above (same as booking -- just instead of adding to the database, this function is removing from database in real time). 
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const updateState = ({
      ...state,
      appointments
    });
    return axios.delete(`/api/appointments/${id}`).then(response => {
      updateSpots(updateState, id);
    });
  };

  return {
    state,
    setDay,
    getInterview,
    getInterviewersForDay,
    bookInterview,
    cancelInterview,
    dailyAppointments
  };
};