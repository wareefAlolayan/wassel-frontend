import {useState,useEffect} from 'react'
import TeamsForm from './TeamsForm'
import axios from 'axios'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

function TeamsList() {
    const [teams, setTeams] = useState([])
    const navigate = useNavigate()

    async function getAllTeams() {
        const response = await axios.get('http://127.0.0.1:8000/api/teams/')
        setTeams(response.data)
    }

    async function addTeam(name) {
        const response = await axios.post('http://127.0.0.1:8000/api/teams/' , {name})
        setTeams([...teams, response.data])
        
    }
    async function deleteTeam(teamId) {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/teams/${teamId}/`)
        setTeams(teams.filter(t => t.id !== teamId))
    } catch (err) {
        console.log(err)
    }
}

    useEffect(() => {
        getAllTeams()
    }, [])

    return (
        <div>
            <h1>Existing Teams</h1>
            {
                teams.length
                    ?
                    (
                        <ul>
                            {
                                teams.map(team => (
                                    <li key={team.id}>
                                        {team.name}
                                        <button onClick={() => deleteTeam(team.id)}>Delete</button>
                                        <button onClick={() => navigate(`/manager/teams/${team.id}/edit`)}>Edit</button>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                    : (
                         <h2>No Teams</h2>
                    )
                   
            }
            <TeamsForm addTeam={addTeam}/>
            
        </div>
    )
}

export default TeamsList