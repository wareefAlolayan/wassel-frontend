import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate , useParams } from 'react-router'

function TeamsForm({addTeam , teamId , setEditTeam , setEditing ,teams, setTeams}) { 
    const [name,setName]= useState('')
    const navigate = useNavigate()
    const [formData , setFormData]=useState({
        name:''
    })
    console.log(teamId)
    async function getSingleTeam() {
        const response = await axios.get(`http://127.0.0.1:8000/api/teams/${teamId}/`)
        console.log(response)
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
            setTeams(teams.map(team => team.id === teamId ? { ...team, ...formData } : team)) // MDN find the specefic team and replace its onfo with form info
            setEditing(false)
            setEditTeam(null)
        }
        else{
            addTeam(formData.name)
            setFormData({
                name:''
            })
        }

    }
  return (
    <div>
        <h1>{  teamId ?  `Edit ${name}` : 'Add a new team👥'} </h1>
        <form onSubmit={handleSubmit} >
            <div>
                <label htmlFor='name'>Team Name : </label>
                <input value={formData.name} onChange={handleChange} id='name' name='name' />

            </div>
            <button type='submit'>Submit</button>
        </form>
            
    </div>
  )
}

export default TeamsForm