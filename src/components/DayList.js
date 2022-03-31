import React from 'react';
import DayListItem from './DayListItem';

//Defining the DayList Component that is used to display each of the dayItems 

export default function DayList(props) {

  const DayItems = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}
        {...day}>
      </DayListItem>
    )
  });

  return (
    <ul>
      {DayItems}
    </ul>
  );
};