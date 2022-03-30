import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);



  function transition(newMode, replace = false) {
    if (replace) {

      const newHistory = [...history]
      newHistory.pop();
      setHistory(prev => [...newHistory, newMode])
      setMode(newMode)
      return;

    } else {

      setMode(newMode)
      setHistory(prev => [...prev, newMode])
      return;
      
    }
  }

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      setHistory(prev => prev.slice(0, prev.length - 1));
      return;
    }
  }

  return { mode, transition, back };
}