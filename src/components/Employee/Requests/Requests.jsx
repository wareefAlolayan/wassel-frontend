import { useState, useEffect } from 'react'
import axios from 'axios'
import { authRequest } from '../../lib/auth'
import { useParams } from 'react-router'
import RequestForm from './RequestForm'
import './Requests.css'

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
            const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/vrequests/` })
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
        const response = await authRequest({ method: 'post', url: `http://127.0.0.1:8000/api/vrequests/employee/${employee.id}`, data: requestData })
        setAllRequests([...allRequests, response.data])

    }

    async function deleteRequest(requestId) {
        try {
            await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/vrequests/${requestId}` })
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
                    < RequestForm requestId={editReq} setEditReq={setEditReq} setEditing={setEditing} setAllRequests={setAllRequests} allRequests={allRequests} employee={employee} />
                ) :
                    (
                        <div>
                            <RequestForm createRequest={createRequest} employee={employee} />

                            <h2>Pending Requests :</h2>
                            {
                                pending.length ?
                                    (
                                        <div className='requests-container'>
                                            <ul>
                                                {
                                                    pending.map(request => (
                                                        <div className='request-container'>
                                                            <li key={request.id}>
                                                                <div className='r-top'>
                                                                    <div className='r-t-left'>
                                                                        <p className='r-e-name' >{employee.name}</p>
                                                                        <p className='r-e-team'>{employee.team?.name}</p>
                                                                        <p className='r-dates'>{request.start_date}  -  {request.end_date}</p>
                                                                    </div>
                                                                    <div className='r-t-right'>
                                                                        <p>pending</p>
                                                                    </div>
                                                                </div>
                                                                <div className='r-bottom'>
                                                                    <p>Reason : {request.reason}</p>
                                                                    <div className='r-actions'>
                                                                        <button id='r-edit' onClick={() => handleContent(request.id)}>Edit</button>
                                                                        <button id='r-cancel' onClick={() => deleteRequest(request.id)}>Cancel</button>
                                                                    </div>
                                                                </div>



                                                            </li>

                                                        </div>

                                                    ))
                                                }
                                            </ul>

                                        </div>

                                    ) :
                                    (
                                        <p>None at the moment</p>
                                    )
                            }
                            <h2>Completed Requests :</h2>
                            {
                                complete.length ?
                                    (
                                        <div className='requests-container'>
                                            <ul>
                                                {
                                                    complete.map(request => (
                                                        <div className='request-container'>
                                                            <li key={request.id}>
                                                                <div className='r-top'>
                                                                    <div className='r-t-left'>
                                                                        <p className='r-e-name'>{employee.name}</p>
                                                                        <p className='r-e-team'>{employee.team?.name}</p>
                                                                        <p className='r-dates'>{request.start_date}  -  {request.end_date}</p>

                                                                    </div>
                                                                    <div className='r-t-right'>
                                                                        <p>{request.status === 'A' ? 'accepted' : 'denied'}</p>
                                                                    </div>
                                                                </div>
                                                                <div className='r-bottom'>
                                                                    <p>Reason : {request.reason}</p>
                                                                </div>


                                                            </li>
                                                        </div>

                                                    ))
                                                }
                                            </ul>
                                        </div>

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