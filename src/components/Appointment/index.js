import React from 'react';
import "components/Appointment/styles.scss";
import Header from './header';
import Show from './show';
import Empty from './empty';
import Form from './Form';
import Status from './status';
import Confirm from './confirm';
import Error from './error';
import useVisualMode from 'hooks/useVisualMode';

//Defining the Appointment Component
//Takes in multiple components and displays certain functions depending on the state that is being asked of it.

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //Deconstructing certain functions from the useVisualMode file.
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Save function being made that, when clicked, inputs the values for the student and interviewer and adds to the api -- then transitioning
  //the page to the "SAVING" page which shows as a continuous loop for the user.

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(() => {
        transition(ERROR_SAVE, true)
      })
  };

  //removeInterview function being made to cancel/delete an appointment, which prompts a confirmation page, then once confirmed, transitions to a "DELETING" page --
  //which is a continuous loop, much like the saving loop mentioned in the saving function above.

  function removeInterview() {
    if (mode === SHOW) {
      transition(CONFIRM)
    } else {
      transition(DELETING, true)
      props.cancelInterview(props.id)
        .then(() => {
          transition(EMPTY)
        })
        .catch(() => {
          transition(ERROR_DELETE, true)
        })
    };
  };

  //Edit function which transitions the user to the EDIT page -- prompting a new submission to be made.
  function edit() {
    transition(EDIT)
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}> </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={removeInterview}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to cancel this appointment?"
          onCancel={() => back()}
          onConfirm={() => removeInterview()}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={() => back()}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error message="Unable to save appointment" onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Unable to delete appointment" onClose={() => back()} />
      )}
    </article>
  )
}