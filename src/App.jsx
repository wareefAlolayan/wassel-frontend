import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import TeamsList from './components/Manager/Teams/TeamsList'
import TeamsForm from './components/Manager/Teams/TeamsForm'
import Home from './components/Home'
import EmployeeList from './components/Manager/Employees/EmployeeList'
import ManagerHome from './components/Manager/ManagerHome'

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/manager/:managerId' element={<ManagerHome />} />
        <Route path='/manager/teams' element={<TeamsList />} />
        <Route path='/manager/teams/:teamId/edit' element={<TeamsForm/>}/>
        <Route path='/manager/employees' element={<EmployeeList/>}/>
      </Routes>
    </Router>
  )
}

export default App