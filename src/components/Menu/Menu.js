import React, { useState, useEffect } from 'react'
import { Navbar, Container, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../etc/AuthContext'

export default function Menu({ setError }) {
    const { profile, logout } = useAuth()
    const [userIcon, setIcon] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const picture = profile.ProfilePicture ?? './img/no-user-icon-white.png'
        setIcon(picture)
    }, [profile.Name, profile.ProfilePicture])
    
    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to logout')
        }
    }

    function returnToDashboard() {
        console.log("clicked")
    }
  
    return (
        <>
            <menu style={{ backgroundImage: "url(./img/repeatable-design.png)" }}>
                <Navbar className='menu' expand='lg'>
                    <Container className="w-100">
                        <Navbar.Brand className="text-white fs-3 font-fam-title" href="/">Once Upon a Wishlist</Navbar.Brand>
                        <NavDropdown align='end' className='display' title={
                            <>
                                <div id="user-picture" className='user-picture' style={{ width: '30px', height: '30px', backgroundImage: `url(${userIcon})` }}></div>
                                <div className='d-none d-sm-block'>My Profile</div>
                            </>}>
                            <NavDropdown.Item as="button" onClick={returnToDashboard}>Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item as="button">Something Else</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as="button" onClick={ handleLogout }>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Container>
                </Navbar>
            </menu>
            { }
        </>
    )
}