import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate , useParams } from 'react-router'

function TeamsForm() { 
    const [name,setName]= useState('')
    const {teamId } = useParams()
    const navigate = useNavigate()
    const [formData , setFormData]=useState({
        name:''
    })

    async function getSingleTeam() {
        const response = await axios.get(`http://127.0.0.1:8000/api/teams/${teamId}/`)
        setFormData(response.data)
        setName(response.data.name)
    }

    useEffect(() => {
        if (teamId) {
            getSingleTeam()
        }
    }, [])
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }
    async function handleSubmit(event){
        event.preventDefault()
        let response = {}
        if(teamId){
            response = await axios.patch(`http://127.0.0.1:8000/api/teams/${teamId}/`, formData)
        }
        else{
            response = await axios.post('http://127.0.0.1:8000/api/teams/', formData)
        }
        if(response.status === 201 || response.status === 200){
            navigate('/teams')
        }

    }
  return (
    <div>TeamsForm</div>
  )
}

export default TeamsForm