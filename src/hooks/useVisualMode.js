import { useState } from 'react';

//Defining a Hook function used to clean the code within the -- Index.js -- function/component

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Function made that transitions the page to another display when called upon.

  function transition(newMode, replace = false) {
    if (replace) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(prev => [...newHistory, newMode]);
      setMode(newMode);
      return;

    } else {
      setMode(newMode);
      setHistory(prev => [...prev, newMode]);
      return;
    }
  }

  //Function made that moves the user back to the spot they were previously viewing -- making the user experience seamless and appearing to be effortless.

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => prev.slice(0, prev.length - 1));
      return;
    }
  }
  return { mode, transition, back };
}