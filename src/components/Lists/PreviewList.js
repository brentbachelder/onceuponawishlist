import React from 'react'
import { useParams } from 'react-router'

export default function PreviewList() {
    const {listId} = useParams()
  
    return (
        <div>
            Preview List Page - { listId }
        </div>
    )
}
