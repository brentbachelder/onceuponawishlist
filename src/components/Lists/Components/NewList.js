import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Image } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function NewList() {
    const linkRef = useRef()
    const linkImageRef = useRef()

    const [giftImage, setGiftImage] = useState('')
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const location = useLocation()
    let gotoURL = '/dashboard'
    if(location.state) { gotoURL = location.state.pathname}
    console.log(gotoURL)


    function UpdateImage(e) {
        
        const link = e.target.value
        let imageUrl = ''
        if(link.includes('amazon.com')) imageUrl = GetAmazonImage(link)
        setGiftImage(imageUrl)
        console.log(imageUrl)
    }
    
    function GetAmazonImage(link) {
        if(link.includes('/dp/')) {
            let smallLink = link.split('/dp/')[1]
            let asin = smallLink.split('/')[0]
            return `http://ws.assoc-amazon.com/widgets/q?_encoding=UTF8&ASIN=${asin}&Format=_SL500_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=thekintespacec00`
        }
        setError('Invalid Amazon link')
    }

  
    return (
        <div className="w-100" style={{ maxWidth: '400px' }}>
            <Card className='mx-2'>
                <Card.Body>
                    <h2 className='text-center'>Log In</h2>
                    {error && <Alert variant="danger">{ error }</Alert>}
                    <Form>
                        <Form.Group className='mt-4' id="email">
                            <Form.Label>Link</Form.Label>
                            <Form.Control type="text" ref={linkRef} onChange={ UpdateImage } />
                        </Form.Group>
                        <Button disabled={loading} className='mt-4 w-100' type="submit">Log In</Button>
                    </Form>
                    <Image src={ giftImage } width={ '50px' } height={ '100px' } ref={ linkImageRef } />
                </Card.Body>
            </Card>
        </div>
    )
}
