import React from 'react'
import { useParams } from 'react-router'

export default function List() {
  const {listId} = useParams()
  
  return (
    <div>
      List Page - { listId }
    </div>
  )
}
