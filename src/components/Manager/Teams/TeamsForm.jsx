import {useEffect, useState} from 'react'
import { authRequest } from '../../lib/auth'
import './TeamsForm.css'

function TeamsForm({addTeam , teamId , setEditTeam , setEditing ,teams, setTeams}) { 
    const [name,setName]= useState('')
    const [formData , setFormData]=useState({
        name:''
    })
    async function getSingleTeam() {
        const response = await authRequest({method:'get',url:`http://127.0.0.1:8000/api/teams/${teamId}/`})
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
    }
    async function handleSubmit(event){
        event.preventDefault()
        let response = {}
        if(teamId){
            response = await authRequest({method:'patch',url:`http://127.0.0.1:8000/api/teams/${teamId}/`,data: formData})
            setTeams(teams.map(team => team.id === teamId ? { ...team, ...formData } : team)) // MDN find the specefic team and replace its info with form info
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
        <p className='t-form-title'>{  teamId ?  `Edit ${name}` : 'Add a new team👥'} </p>
        <form className='team-form' onSubmit={handleSubmit} >
            <div>
                <label className='tn-label' htmlFor='name'>Team Name : </label>
                <input className='tn-input' value={formData.name} onChange={handleChange} id='name' name='name' />

            </div>
            <button className='t-btn' type='submit'>Submit</button>
        </form>
            
    </div>
  )
}

export default TeamsForm