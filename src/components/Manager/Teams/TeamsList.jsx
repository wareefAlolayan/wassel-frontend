import { useState, useEffect } from 'react'
import TeamsForm from './TeamsForm'
import { authRequest } from '../../lib/auth'
import './TeamsList.css'

function TeamsList() {
    const [teams, setTeams] = useState([])
    const [editing, setEditing] = useState(false)
    const [editTeam, setEditTeam] = useState(null)

    async function getAllTeams() {
        const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/teams/' })
        setTeams(response.data)
    }

    async function addTeam(name) {
        const response = await authRequest({ method: 'post', url: 'http://127.0.0.1:8000/api/teams/', data: { name } })
        setTeams([...teams, response.data])

    }
    async function deleteTeam(teamId) {
        try {
            await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/teams/${teamId}/` })
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
                    <TeamsForm teamId={editTeam} setEditTeam={setEditTeam} setEditing={setEditing} setTeams={setTeams} teams={teams} />
                )
                    : (
                        <div>
                            {
                                teams.length
                                    ?
                                    (<div className='teams-container'>
                                        {teams.map(team => (
                                            <div className='team-card'>
                                                <p className='team-name'>{team.name}</p>
                                                <div className='team-actions'>
                                                    <button className='delete-team' onClick={() => deleteTeam(team.id)}>Delete</button>
                                                    <button className='edit-team' onClick={() => handleContent(team.id)}>Edit</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

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