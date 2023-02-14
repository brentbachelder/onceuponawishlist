import React from 'react'

export default function IndividualHistory({ entry }) {
  console.log(entry)
  return (
    <div style={{ display: 'flex' }}>
        <img src={entry.UserPicture} width="200" height="200" alt="" />
        <h3>{entry.ListName}</h3>
        <h6>{entry.UserName}</h6>
    </div>
  )
}