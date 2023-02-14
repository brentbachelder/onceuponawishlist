import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../etc/AuthContext'
import { db } from '../../../etc/firebase'
import { get, child, ref } from 'firebase/database'
import IndividualList from './IndividualList'

export default function MyLists({ setError }) {
    const { profile } = useAuth()
    const profileLists = profile.Lists
    const [fullList, setFullList] = useState([])
    console.log(fullList)

    // Get the list information
    useEffect(() => {
        async function fetchData() {
            let tempLists = [] // Create temp array to store firebase values until for loop is complete
            for(let list in profileLists) { // List returns as '#-listID', hence using the split
                await get(child(ref(db), `Lists/${profileLists[list]}`)).then((snapshot) => {
                    if (snapshot.exists()) tempLists.push({ ID: list, List: snapshot.val() })
                    else tempLists.push({ ID: list, List: { Name: "No list found" }})
                }).catch((error) => {
                    setError("Error getting my lists from database. Error: " + error);
                });
            }
            setFullList(tempLists) // Send the temp array to official historyListNames array
        }
        fetchData()
    }, [profileLists, setError])
    
    // Make sure history is defined and that the object count is the same as 'fullHistory' to display IndividualHistories
    // Keeps sizing issues standard and limits render count
    return (
        profileLists && fullList.length === Object.keys(profileLists).length ?
            fullList.map(entry => {
                return <IndividualList key={entry.ID} entry={entry} />
            })
            : null
    )
}
