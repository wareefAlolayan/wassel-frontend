import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import RequestForm from './RequestForm'

function Requests({ employee }) {
    const { employeeId } = useParams()
    const [allRequests, setAllRequests] = useState([])
    const [employeeRequests, setEmployeeRequests] = useState([])
    const [pending, setPending] = useState([])
    const [complete, setComplete] = useState([])

    const [editing, setEditing] = useState(false)
    const [editReq, setEditReq] = useState(null)


    async function getVacationRequests() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/vrequests/`)
            setAllRequests(response.data)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.error)
        }
    }
    function getEmplyeeRequests() {
        const employeeRequests = allRequests.filter(request =>
            request.employee === Number(employeeId)
        )
        setEmployeeRequests(employeeRequests)
    }
    function getPending() {
        const pendingRequests = employeeRequests.filter(request => request.status === 'P')
        setPending(pendingRequests)
    }
    function getComplete() {
        const completedRequests = employeeRequests.filter(request => request.status !== 'P')
        setComplete(completedRequests)
    }


    async function createRequest(requestData) {
        const response = await axios.post(`http://127.0.0.1:8000/api/vrequests/employee/${employee.id}`,requestData)
        setAllRequests([...allRequests, response.data])

    }

    async function deleteRequest(requestId) {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/vrequests/${requestId}`)
            setAllRequests(allRequests.filter(r => r.id !== requestId))
        } catch (err) {
            console.log(err)
        }
    }

    function handleContent(reqId) {
        setEditing(true)
        setEditReq(reqId)
    }


    useEffect(() => {
        getVacationRequests()
    }, [])
    useEffect(() => {
        getEmplyeeRequests()
    }, [allRequests])
    useEffect(() => {
        getPending()
        getComplete()
    }, [employeeRequests])

    // console.log('allRequests' , allRequests)
    // console.log('employeeRequests' , employeeRequests)
    // console.log('pending' , pending)
    // console.log('complete' , complete)


    return (
        <div>
            {
                editing ? (
                    < RequestForm requestId={editReq} setEditReq={setEditReq} setEditing={setEditing} setAllRequests={setAllRequests} allRequests={allRequests} employee={employee}/>
                ) :
                    (
                        <div>
                            <RequestForm createRequest={createRequest} employee={employee} />

                            <h2>Pending Requests :</h2>
                            {
                                pending.length ?
                                    (
                                        <ul>
                                            {
                                                pending.map(request => (
                                                    <li key={request.id}>
                                                        {employee.name}
                                                        {employee.team?.name}
                                                        {request.status}
                                                        {request.start_date}  -  {request.end_date}
                                                        Reason : {request.reason}

                                                        <button onClick={() => deleteRequest(request.id)}>Cancel</button>
                                                        <button onClick={() => handleContent(request.id)}>Edit</button>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    ) :
                                    (
                                        <p>None at the moment</p>
                                    )
                            }
                            <h2>Completed Requests :</h2>
                            {
                                complete.length ?
                                    (
                                        <ul>
                                            {
                                                complete.map(request => (
                                                    <li key={request.id}>
                                                        <p>{employee.name}</p>
                                                        <p>{employee.team?.name}</p>
                                                        <p>{request.status === 'A' ? 'Accepted' : 'Denied'}</p>
                                                        <p>{request.start_date}  -  {request.end_date}</p>
                                                        <p>Reason : {request.reason}</p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    ) :
                                    (
                                        <p>None at the moment</p>
                                    )
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default Requests