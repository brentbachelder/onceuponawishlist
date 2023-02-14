import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../etc/AuthContext'
import { db } from '../../../etc/firebase'
import { get, child, ref } from 'firebase/database'
import IndividualHistory from './IndividualHistory'

export default function History({ setError }) {
    const { profile } = useAuth()
    const history = profile.History
    const [historyListNames, setListNames] = useState([])
    const [historyUserInfo, setUserInfo] = useState([])
    const [fullHistory, setFullHistory] = useState([])

    // Get the list names
    useEffect(() => {
        async function fetchData() {
            let listNames = [] // Create temp array to store firebase values until for loop is complete
            for(let listItem in history) { // List returns as '#-listID', hence using the split
                await get(child(ref(db), `Lists/${listItem.split('-')[1]}/Name`)).then((snapshot) => {
                    if (snapshot.exists()) listNames.push({ ID: listItem.split('-')[0], ListName: snapshot.val() })
                    else listNames.push({ ID: listItem.split('-')[0], ListName: "No name" })
                }).catch((error) => {
                    setError("Error getting history from database. Error: " + error);
                });
            }
            setListNames(listNames) // Send the temp array to official historyListNames array
        }
        fetchData()
    }, [history, setError])

    // Get the user name and picture
    useEffect(() => {
        async function fetchData() {
            let userInfo = [] // Create temp array to store firebase values until for loop is complete
            for(let id in history) { 
                await get(child(ref(db), `Users/${history[id]}`)).then((snapshot) => {
                    if (snapshot.exists()) userInfo.push({UserName: snapshot.val().Name, UserPicture: snapshot.val().ProfilePicture})
                    else userInfo.push({ UserName: "No user name", UserPicture: "No user picture" })
                }).catch((error) => {
                    setError("Error getting history from database. Error: " + error);
                });
            }
            setUserInfo(userInfo) // Send the temp array to official historyUserInfo array
        }
        fetchData()
    }, [history, setError])

    useEffect(() => { // Combine historyListNames & historyUserInfo to render individual components
        let combined = historyListNames.map((item, i) => Object.assign({}, item, historyUserInfo[i]));
        setFullHistory(combined)
    }, [historyListNames, historyUserInfo])
    
    // Make sure history is defined and that the object count is the same as 'fullHistory' to display IndividualHistories
    // Keeps sizing issues standard and limits render count
    return (
        history && fullHistory.length === Object.keys(history).length ?
            fullHistory.map(entry => {
                return <IndividualHistory key={entry.ID} entry={entry} />
            })
            : null
    )
}
