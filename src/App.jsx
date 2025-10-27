import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import TeamsList from './components/Teams/TeamsList'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/cats' element={<TeamsList />} />
      </Routes>
    </Router>
  )
}

export default App