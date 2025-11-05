import { useEffect, useState } from 'react'
import { authRequest } from '../../lib/auth'
import './Requests.css'

function Requests() {
    const [requests, setRequests] = useState([])
    const [employees, setEmployees] = useState([])

    async function getVacationRequests() {
        const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/vrequests/' })
        const pendingRequests = response.data.filter(request => request.status === 'P')
        setRequests(pendingRequests)
    }

    async function getEmployees() {
        const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/employees/' })
        setEmployees(response.data)
    }


    async function handleApprove(requestId) {
        await authRequest({ method: 'patch', url: `http://127.0.0.1:8000/api/vrequests/${requestId}/accept/` })
        getVacationRequests()
    }
    async function handleDeny(requestId) {
        await authRequest({ method: 'patch', url: `http://127.0.0.1:8000/api/vrequests/${requestId}/deny/` })
        getVacationRequests()
    }

    function getEmployee(empId) {
        const employee = employees.find(emp => emp.id === empId)
        return employee
    }

    useEffect(() => {
        getEmployees()
        getVacationRequests()
    }, [])

    return (

        <div>
            <h2>Pending Vacation Requests</h2>
            {requests.length > 0 ? (

                <div className='requests-container'>
                    <ul>
                        {
                            requests.map((request) => (
                                <div className='request-container'>
                                    <div key={request.id} className='request-box' >
                                        <li key={request.id}>
                                            <div className='r-top'>
                                                <div className='r-t-left'>
                                                    <p className='r-e-name' >{getEmployee(request.employee)?.name}</p>
                                                    <p className='r-e-team'>{getEmployee(request.employee)?.team?.name}</p>
                                                    <p className='r-dates'>{request.start_date} - {request.end_date}</p>
                                                </div>
                                                <div className='r-t-right'>
                                                    <p>pending</p>
                                                </div>
                                            </div>
                                            <div className='r-bottom'>
                                                <p><strong>Reason : </strong> {request.reason}</p>
                                                <div className='r-actions'>
                                                    <button id='approve-btn' onClick={() => handleApprove(request.id)} >Approve</button>
                                                    <button id='deny-btn' onClick={() => handleDeny(request.id)} >Deny</button>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                </div>


                            ))
                        }

                    </ul>
                </div>
            ) :
                <h2> No pending requests</h2>
            }
        </div>
    )
}

export default Requests

