

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(d => d.name === day);

  if (!filteredDays) {
    return [];
  }

  let arr = []
  for (let id of filteredDays.appointments) {
    let ans = state.appointments[id]
    arr.push(ans);
  }
  return arr
}


export function getInterview(state, interview) {
  let stateInterviewersKeys = Object.keys(state.interviewers);
  let result = {};
  if (!state.interviewers || !interview) {
    return null;
  }

  for (const key of stateInterviewersKeys) {

    let interviewer = state.interviewers[key];

    if (interviewer.id === interview.interviewer) {
      result["student"] = interview.student;
      result["interviewer"] = interviewer;
    }
  }
  return result;
}


export function getInterviewersForDay(state, day) {
  if (!state.days) {
    return [];
  }

  const filteredDays = state.days.find(d => d.name === day);

  if (!filteredDays) {
    return [];
  }

  let arr = []
  for (let id of filteredDays.interviewers) {
    let ans = state.interviewers[id]
    arr.push(ans);
  }
  return arr
}


