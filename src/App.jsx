import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import TeamsList from './components/Manager/Teams/TeamsList'
import TeamsForm from './components/Manager/Teams/TeamsForm'
import Home from './components/Home'

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path='/' element={<Home/>}/>

        
        <Route path='/manager/teams' element={<TeamsList />} />
        <Route path='/manager/teams/:teamId/edit' element={<TeamsForm/>}/>
      </Routes>
    </Router>
  )
}

export default App