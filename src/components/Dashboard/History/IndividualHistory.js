import React from 'react'
import './History.css'

export default function IndividualHistory({ entry }) {
  console.log(entry)
  return (
    <div className='history-container'>
        <div className='user-picture' style={{ backgroundImage: `url(${entry.UserPicture})` }} />
        <div className='user-info'>
            <h3>{entry.ListName}</h3>
            <h6>{entry.UserName}</h6>
        </div>
    </div>
  )
}