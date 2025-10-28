import {useState , useEffect} from 'react'
import EmployeeCard from './EmployeeCard'
import axios from 'axios'

function EmployeeList() {
    const [employees , setEmployees] = useState([])
    async function getAllEmployees() {
        const response = await axios.get('http://127.0.0.1:8000/api/employees/')
        setEmployees(response.data.filter(e => e.is_manager !== true))
    }
    useEffect(() => {
        getAllEmployees()
    }, [])

  return (
    <div>
            {
                employees.length
                    ?
                    (
                        <ul>
                            {
                                employees.map(employee => (
                                    <li key={employee.id}>
                                        <EmployeeCard employee={employee}/>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                    : (
                         <h2>No Employees</h2>
                    )
                   
            }
    </div>
  )
}

export default EmployeeList