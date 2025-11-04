import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import './EmployeeHome.css'
import { MdOutlineMail } from "react-icons/md" //react-icons website
import { GoClock } from "react-icons/go"
import { FaUmbrellaBeach } from "react-icons/fa"
import Shifts from './Shifts/Shifts'
import Requests from './Requests/Requests'
import { authRequest } from '../lib/auth'
import LogOutButton from '../Auth/LogOutButton'

function EmployeeHome({setUser}) {
    const { employeeId } = useParams()
    const [employee, setEmployee] = useState({})
    const [errors, setErrors] = useState(null)
    const [activeTab, setActiveTab] = useState('myShifts')
    const [requests, setRequests] = useState([])
    const [pendingRequests, setPendingRequests] = useState(0)

    async function getEmployee() {
        try {
            const response = await authRequest({method:'get',url:`http://127.0.0.1:8000/api/employees/${employeeId}`})
            setEmployee(response.data)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.error)
        }
    }
    async function getVacationRequests() {
        try {
            const response = await authRequest({method:'get',url:`http://127.0.0.1:8000/api/vrequests/`})
            setRequests(response.data)
            const employeeRequests = response.data.filter(request =>
                request.employee === Number(employeeId)
            )
            const pending = employeeRequests.filter(request => request.status === 'P')
            setPendingRequests(pending.length)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.error)
        }
    }

    useEffect(() => {
        getEmployee()
        getVacationRequests()
    }, [])

    function handleTabClick(tab) {
        setActiveTab(tab)
    }
    if (errors) {
        return <h3>{errors}</h3>
    }
    return (
        <div className='Employee-home'>
            <div className='top-bar'>
                <div className='bar-left'>
                    <img src='/src/components/assets/wassel_logo.png' alt='Wassel Logo' className='logo' />
                    <div className='bar-welcome'>
                        <p>Welcome back ,</p>
                        <p id='Employee-name'>{employee.name}</p>
                    </div>

                </div>
                <LogOutButton setUser={setUser}/>
            </div>
            <div className='e-home-body'>

                <div className='left' >
                    <div className='employee-card'>
                        <div className='personal-info'>
                            <h1>{employee.name}</h1>
                            <h2>{employee.team?.name}</h2>
                        </div>
                        <div className='contact-info'>
                            <p><MdOutlineMail /> {employee.email} </p>
                        </div>
                        <hr className='divider' />
                        <div className='status-info'>
                            <p className='vacation'><FaUmbrellaBeach /> {employee.vaction_days_left} vacation days left </p>
                            <p className='pending'> <GoClock /> {pendingRequests} pending request/s </p>
                        </div>
                    </div>

                </div>

                <div className='right' >
                    <div className='e-nav-bar'>
                        <div className={activeTab === 'myShifts' ? 'e-active' : 'e-tab'} onClick={() => handleTabClick('myShifts')}>
                            My Shifts
                        </div>
                        <div className={activeTab === 'requests' ? 'e-active' : 'e-tab'} onClick={() => handleTabClick('requests')}>
                            My Requests
                        </div>

                    </div>

                    <div className='body'>
                        {activeTab === 'myShifts' && <div> <Shifts /> </div>}
                        {activeTab === 'requests' && <div> <Requests employee={employee}/> </div>}
                    </div>
                </div>


            </div>



        </div>
    )
}

export default EmployeeHome
