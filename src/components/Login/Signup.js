import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../etc/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('Passwords do not match')
    }

    try {
        setError('')
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        navigate('/dashboard')
    } catch {
        setError('Failed to create an account')
    }
    
    setLoading(false)
  }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh', backgroundImage: "url(./img/repeatable-design.png)" }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <Card className='mx-2'>
                    <Card.Body>
                        <h2 className='text-center'>Sign Up</h2>
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
                            <Form.Group className='mt-3' id="password-confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={loading} className='mt-4 w-100' type="submit">Sign Up</Button>
                        </Form>
                        <div className='w-100 text-center mt-4'>
                            Already have an account? <Link to="/login">Log In</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
