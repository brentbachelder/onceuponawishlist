import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../etc/AuthContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  let gotoURL = '/dashboard'
  if(location.state) { gotoURL = location.state.pathname}
  console.log(gotoURL)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
        setError('')
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        navigate(gotoURL)
    } catch {
        setError('Email or password incorrect')
    }
    
    setLoading(false)
  }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh', backgroundImage: "url(./img/repeatable-design.png)" }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <Card className='mx-2'>
                    <Card.Body>
                        <h2 className='text-center'>Log In</h2>
                        {error && <Alert variant="danger">{ error }</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mt-4' id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group className='mt-3' id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Button disabled={loading} className='mt-4 w-100' type="submit">Log In</Button>
                        </Form>
                        <div className='w-100 text-center mt-3'>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                        <div className='w-100 text-center mt-4'>
                            Need an account? <Link to="/signup">Sign Up</Link>
                        </div>
                    </Card.Body>
                </Card>
                
            </div>
        </div>
    )
}
