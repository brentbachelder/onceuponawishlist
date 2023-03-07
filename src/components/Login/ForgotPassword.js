import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../etc/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
          setMessage('')
          setError('')
          setLoading(true)
          await resetPassword(emailRef.current.value)
          setMessage('Check your inbox for further instructions')
      } catch {
          setError('Failed to reset password')
      }
      
      setLoading(false)
    }
  
      return (
        <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh', backgroundImage: "url(./img/repeatable-design.png)" }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <Card className='mx-2'>
                    <Card.Body>
                        <h2 className='text-center'>Password Reset</h2>
                        {error && <Alert variant="danger">{ error }</Alert>}
                        {message && <Alert variant="success">{ message }</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mt-4' id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Button disabled={loading} className='mt-4 w-100' type="submit">Reset Password</Button>
                        </Form>
                        <div className='w-100 text-center mt-3'>
                            <Link to="/login">Login</Link>
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
