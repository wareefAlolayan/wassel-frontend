import { useState , useEffect } from "react"
import axios from "axios"
import { saveTokens , getUserFromToken } from "../lib/auth" 
import { useNavigate } from "react-router"

export default function Login({ setUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [employee , setEmployee] = useState(null)
  const navigate = useNavigate()

 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", { email, password })
      saveTokens(res.data.access, res.data.refresh)
      const user = getUserFromToken()
      setUser(user)
      getEmployee(user.user_id)
    } catch (err) {
      console.error(err)
    }
  }

 async function getEmployee(id) {
    const response = await axios.get(`http://127.0.0.1:8000/api/employees/${id}/`)
    setEmployee(response.data)
  }

  function roleNavigation() {
    if (employee) {
      if (employee.is_manager) {
        navigate(`/manager/${employee.id}`);
      } else {
        navigate(`/employee/${employee.id}`);
      }
    }
  }

  useEffect(() => {
    roleNavigation()
  }, [employee])
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}