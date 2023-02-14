import React from 'react'

export default function IndividualList({ entry }) {
  console.log(entry)
  return (
    <div style={{ display: 'flex' }}>
        <h3>{entry.List.Name}</h3>
    </div>
  )
}