import { useState, useEffect } from 'react';
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function useApplicationData() {

  ////////////////////
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day)


  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      console.log(all)
    })
  }, []);
  //////////////////
  const updateSpots = function (state, id) {
    //Finding the day that is current and the one that will be updated
    const currentDay = state.days.find((day) => day.appointments.includes(id));
    //Finding appointments that are null (falsy)
    const nullAppointments = currentDay.appointments.filter(id => !state.appointments[id].interview)
    const spots = nullAppointments.length
    //Making a newDay with the newly updated spots value
    const newDay = { ...currentDay, spots };
    //Checking to impliment the newDay value, just making a new array (map function) and updating the day if the name is correct (updating the spots value)
    const newDays = state.days.map((day) => day.name === state.day ? newDay : day);
    //Setting the state with the newly added days following the map function
    setState({ ...state, days: newDays });
    return newDays;
  };


  /////////////////////
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
    })
  }


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
  }
  /////////////////


  return {
    state,
    setDay,
    getInterview,
    getInterviewersForDay,
    bookInterview,
    cancelInterview,
    dailyAppointments
  }
}