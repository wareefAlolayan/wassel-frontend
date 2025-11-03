import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

function RequestForm({ requestId, setEditReq, setEditing, setAllRequests, allRequests, employee, createRequest }) {
    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        reason: ''
    })
    const { employeeId } = useParams()

    async function getSingleRequest() {
        const response = await axios.get(`http://127.0.0.1:8000/api/vrequests/${requestId}`)
        setFormData(response.data)
    }

    useEffect(() => {
        if (requestId) {
            getSingleRequest()
        }
    }, [requestId])

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        let response = {}
        if (requestId) {
            response = await axios.patch(`http://127.0.0.1:8000/api/vrequests/${requestId}`, formData)
            setAllRequests(allRequests.map(request => request.id === requestId ? { ...request, ...formData } : request))
            setEditing(false)
            setEditReq(null)
        }
        else {
            createRequest(formData)
            setFormData({
                start_date: '',
                end_date: '',
                reason: ''
            })
        }

    }

    return (
        <div>
            <h1>{requestId ? `Edit ` : 'Create a new vacation request 🌴'} </h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor='start_date'>Start Date : </label>
                    <input value={formData.start_date} type='date' id='start_date' name='start_date' onChange={handleChange} />
                    <label htmlFor='end_date'>End Date : </label>
                    <input value={formData.end_date} type='date' id='end_date' name='end_date' onChange={handleChange} />
                    <label htmlFor='reason'>Reason : </label>
                    <textarea value={formData.reason} id='reason' name='reason' onChange={handleChange} />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default RequestForm