import React from 'react'
import { useParams } from 'react-router'

export default function OwnerList() {
    const {listId} = useParams()
  
    return (
        <div>
            Owner List Page - { listId }
        </div>
    )
}
