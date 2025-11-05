import {useState , useEffect} from 'react'
import EmployeeCard from './EmployeeCard'
import { authRequest } from '../../lib/auth'
import './EmployeeList.css'

function EmployeeList() {
    const [employees , setEmployees] = useState([])
    async function getAllEmployees() {
        const response = await authRequest({method:'get',url:'http://127.0.0.1:8000/api/employees/'})
        setEmployees(response.data.filter(e => e.is_manager !== true && !e.email.startsWith('admin')))//w3school
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
                        <div className='employees-grid'>
                            {
                                employees.map(employee => (
                                    <div className='card-container'>
                                        <EmployeeCard employee={employee}/>
                                    </div>
                                ))
                            }
                        </div>
                    )
                    : (
                         <h2>No Employees</h2>
                    )
                   
            }
    </div>
  )
}

export default EmployeeList