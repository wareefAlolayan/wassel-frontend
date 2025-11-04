import React from 'react'
import { clearTokens } from '../lib/auth' 
import { useNavigate } from 'react-router'
import { MdLogout } from "react-icons/md" //react-icons website

function LogOutButton({setUser}) {
    const navigate = useNavigate()
    function handleLogOut(){
        clearTokens()
        setUser(null)
        navigate('/')
    }
  return (
    <div>
      <button onClick={handleLogOut} className='logout-btn'><MdLogout />Logout</button>
    </div>
  )
}

export default LogOutButton