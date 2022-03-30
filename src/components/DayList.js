import React from 'react';
import DayListItem from './DayListItem';

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
  })

  return (
    <ul>
      {DayItems}
    </ul>
  )
}