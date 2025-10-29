import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import './ManagerHome.css'
import { MdLogout } from "react-icons/md" //react-icons website
import EmployeeList from './Employees/EmployeeList'
import TeamsList from './Teams/TeamsList'
import ShiftBoard from './Shifts/ShiftBoard'

function ManagerHome() {
  const { managerId } = useParams()
  const [manager, setManager] = useState({})
  const [errors, setErrors] = useState(null)
  const [activeTab, setActiveTab] = useState('board')

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

  function handleTabClick(tab) {
    setActiveTab(tab)
  }

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
          <div className={activeTab === 'board' ? 'active' : 'tab'} onClick={() => handleTabClick('board')}>
            Board
          </div>
          <div className={activeTab === 'requests' ? 'active' : 'tab'} onClick={() => handleTabClick('requests')}>
            Requests
          </div>
          <div className={activeTab === 'employees' ? 'active' : 'tab'} onClick={() => handleTabClick('employees')}>
            Employees
          </div>
          <div className={activeTab === 'teams' ? 'active' : 'tab'} onClick={() => handleTabClick('teams')}>
            Teams
          </div>
        </div>

        <div className='body'>
          {activeTab === 'board' && <div> <ShiftBoard/></div>}
          {activeTab === 'requests' && <div>Requests content goes here</div>}
          {activeTab === 'employees' && <div><EmployeeList/></div>}
          {activeTab === 'teams' && <div><TeamsList/></div>}
        </div>
      </div>


    </div>
  )
}

export default ManagerHome

