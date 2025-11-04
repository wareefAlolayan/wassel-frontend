import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './components/Home'
import ManagerHome from './components/Manager/ManagerHome'
import EmployeeHome from './components/Employee/EmployeeHome'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import { getUserFromToken } from './components/lib/auth'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState(getUserFromToken())
  return (
    <Router>

      <Routes>
        <Route path='/' element={<Home setUser={setUser} />} />

        <Route path='/employee/:employeeId' element={<ProtectedRoute>
          <EmployeeHome setUser={setUser} />
        </ProtectedRoute>} />

        <Route path='/manager/:managerId' element={<ProtectedRoute>
          <ManagerHome setUser={setUser} />
        </ProtectedRoute>} />

      </Routes>
    </Router>
  )
}

export default App