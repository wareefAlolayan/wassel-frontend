import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import './ManagerHome.css'
import { MdLogout } from "react-icons/md" //react-icons website

function ManagerHome() {
  const { managerId } = useParams()
  const [manager, setManager] = useState({})
  const [errors, setErrors] = useState(null)

  async function getManager() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/employees/${managerId}`)
      console.log(response.data)
      setManager(response.data)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
  }

  useEffect(() => {
    getManager()
  }, [])

  if (errors) {
    return <h3>{errors}</h3>
  }

  return (
    <div className='manager-home'>
      <div className='top-bar'>
        <div className='bar-left'>
          <img src='/src/components/assets/wassel_logo.png' alt='Wassel Logo' className='logo' />
          <div className='bar-welcome'>
            <p>Welcome ,</p>
            <p id='manager-name'>{manager.name}</p>
          </div>

        </div>
        <button className="logout-btn"><MdLogout />Logout</button>
      </div>
      <div className='home-body'>
        <div className='nav-bar'>
          here is nav bar
        </div>

        <div className='body'>
          here body
        </div>
      </div>


    </div>
  )
}

export default ManagerHome

