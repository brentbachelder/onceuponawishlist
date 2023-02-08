import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
        This is the homepage
        <div className='w-100 text-center mt-3'>
            <Link to="/login">Login</Link>
        </div>
    </div>
  )
}
