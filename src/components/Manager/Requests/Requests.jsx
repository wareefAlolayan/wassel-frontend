import { useEffect, useState } from 'react'
import axios from 'axios'

function Requests() {
    const [requests, setRequests] = useState([])
    const [employees, setEmployees] = useState([])

    async function getVacationRequests() {
        const response = await axios.get('http://127.0.0.1:8000/api/vrequests/')
        const pendingRequests = response.data.filter(request => request.status === 'P')
        setRequests(pendingRequests)
    }

    async function getEmployees() {
        const response = await axios.get('http://127.0.0.1:8000/api/employees/')
        setEmployees(response.data)
    }
    

    async function handleApprove(requestId) {
        await axios.patch(`http://127.0.0.1:8000/api/vrequests/${requestId}/accept/`)
        getVacationRequests()
    }
    async function handleDeny(requestId) {
        await axios.patch(`http://127.0.0.1:8000/api/vrequests/${requestId}/deny/`)
        getVacationRequests()
    }

    function getEmployeeName(empId){
        const employee = employees.find(emp => emp.id === empId)
        return employee?.name
    }
    
    useEffect(() => {
        getEmployees() 
        getVacationRequests()
    }, [])
    
    return (
        <div className='requests-container'>
            <h1>Pending Vacation Requests</h1>
            <div className='requests-lis'>
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <div key={request.id} className='request-box' >
                            <h3>{getEmployeeName(request.employee)}</h3>
                            <p>
                                <strong>Vacation Days :</strong>
                                {request.start_date} - {request.end_date}
                            </p>
                            <p><strong>Reason : </strong> {request.reason}</p>
                            <div className='request-actions'>
                                <button className='approve-btn' onClick={() => handleApprove(request.id)} >Approve</button>
                                <button className='deny-btn' onClick={() => handleDeny(request.id)} >Deny</button>
                            </div>
                        </div>

                    ))
                ) :
                    <h2> No pending requests</h2>
                }
            </div>
        </div>
    )
}

export default Requests

