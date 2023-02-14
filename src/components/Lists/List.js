import React, { useEffect, useState } from 'react'
import { db } from '../../etc/firebase'
import { ref, onValue } from "firebase/database";

export default function List() {
  const [listId, setListId]  = useState()
  const [list, setList] = useState({})

  useEffect(() => {
    const listPage = window.location.pathname.split('/')[2];
    setListId(listPage)
    onValue(ref(db, `Lists/${listPage}`), (snapshot) => {
      console.log(snapshot.val());
      setList(snapshot.val())
    })
  }, [])

  
  return (
    <>
      <div>
        List Page - { listId }
      </div>
      { list?.Gifts?.map((gift, i) => {
        return <div key={i}>{ gift.Name }</div>
      })}
    </>
  )
}
