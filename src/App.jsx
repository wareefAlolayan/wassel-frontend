import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import TeamsList from './components/Teams/TeamsList'
import NavBar from './components/NavBar/NavBar'
import TeamsForm from './components/Teams/TeamsForm'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/teams' element={<TeamsList />} />
        <Route path='/teams/:teamId/edit' element={<TeamsForm/>}/>
      </Routes>
    </Router>
  )
}

export default App