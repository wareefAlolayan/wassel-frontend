import { useState, useEffect } from 'react'
import TeamsForm from './TeamsForm'
import axios from 'axios'
import { useNavigate } from 'react-router'

function TeamsList() {
    const [teams, setTeams] = useState([])
    const navigate = useNavigate()
    const [editing, setEditing] = useState(false)
    const [editTeam, setEditTeam] = useState(null)

    async function getAllTeams() {
        const response = await axios.get('http://127.0.0.1:8000/api/teams/')
        setTeams(response.data)
    }

    async function addTeam(name) {
        const response = await axios.post('http://127.0.0.1:8000/api/teams/', { name })
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
    function handleContent(teamId) {
        setEditing(true)
        setEditTeam(teamId)
    }
    useEffect(() => {
        getAllTeams()
    }, [])

    return (
        <div>
            {
                editing ? (
                    <TeamsForm teamId={editTeam}  setEditTeam={setEditTeam}  setEditing = {setEditing} setTeams={setTeams} teams={teams}/>
                )
                :(
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
                                                    <button onClick={() => handleContent(team.id)}>Edit</button>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                                : (
                                    <h2>No Teams</h2>
                                )

                        }
                        <TeamsForm addTeam={addTeam} />
                    </div>
                        )

            }
        </div>
            )

}
export default TeamsList