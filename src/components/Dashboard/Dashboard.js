import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../etc/AuthContext'
import { Container, Alert } from 'react-bootstrap'

import Menu from '../Menu/Menu'
import History from './History/History'
import MyLists from './MyLists/MyLists'

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser } = useAuth()
  
    return currentUser ? (
    <>
        <Menu setError={ setError }/>
        <Container className='w-100'>
            {error && <Alert className='mt-4' variant="danger">{ error }</Alert>}
            <Container className='mt-4'>
                <MyLists setError={ setError } />
            </Container>
            <Container className='mt-4'>
                <History setError={ setError } />
            </Container>
        </Container>
    </>
  ) : <Navigate to={"/login"} />
}
