import {useState,useEffect} from 'react'
import TeamsForm from './TeamsForm'
import axios from 'axios'

function TeamsList() {
    const [teams, setTeams] = useState([])

    async function getAllTeams() {
        const response = await axios.get('http://127.0.0.1:8000/api/teams/')
        setTeams(response.data)
    }

    async function addTeam(name) {
        const response = await axios.post('http://127.0.0.1:8000/api/teams/')
        setTeams([...teams, response.data])
        
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
                                    </li>
                                ))
                            }
                        </ul>
                    )
                    : (
                         <h2>No Teams</h2>
                    )
                   
            }
            <h1>Add a new Team</h1>
            <TeamsForm addTeam={addTeam}/>
            
        </div>
    )
}

export default TeamsList